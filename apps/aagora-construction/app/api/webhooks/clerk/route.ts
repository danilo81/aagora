import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@workspace/db';
import { user, organization, organizationUser } from '@workspace/db/schema';
import { eq } from 'drizzle-orm';

// Valid roles — allowlist to prevent arbitrary role injection from webhook payloads
const VALID_ROLES = ['admin', 'administrador', 'editor', 'viewer', 'usuario'] as const;
type ValidRole = typeof VALID_ROLES[number];

function sanitizeRole(raw: unknown): ValidRole {
    if (typeof raw === 'string' && VALID_ROLES.includes(raw as ValidRole)) {
        return raw as ValidRole;
    }
    return 'usuario';
}

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error('[webhook/clerk] CLERK_WEBHOOK_SECRET is not set');
        return new Response('Server misconfiguration', { status: 500 });
    }

    // Validate svix headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Missing svix headers', { status: 400 });
    }

    const body = await req.text();
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('[webhook/clerk] Signature verification failed:', err);
        return new Response('Invalid signature', { status: 401 });
    }

    const eventType = evt.type;

    // ── user.created / user.updated ──────────────────────────────────────────
    if (eventType === 'user.created' || eventType === 'user.updated') {
        const { first_name, last_name, email_addresses, phone_numbers, public_metadata } = evt.data;

        const email = email_addresses[0]?.email_address;
        if (!email) {
            return new Response('Missing email in event payload', { status: 400 });
        }

        const name = `${first_name ?? ''} ${last_name ?? ''}`.trim() || email;
        const phone = phone_numbers?.[0]?.phone_number ?? null;
        const role = sanitizeRole(public_metadata?.role);
        const cargo = typeof public_metadata?.cargo === 'string' ? public_metadata.cargo : 'Collaborator';

        try {
            // Drizzle upsert — email is the unique identifier
            await db.insert(user).values({
                name,
                email,
                telefono: phone,
                cargo,
                role,
            }).onConflictDoUpdate({
                target: user.email,
                set: {
                    name,
                    telefono: phone,
                    cargo,
                    role,
                    updatedAt: new Date(),
                },
            });
        } catch (err) {
            console.error('[webhook/clerk] Error upserting user:', err);
            return new Response('Database error', { status: 500 });
        }
    }

    // ── organization.created / organization.updated ──────────────────────────
    if (eventType === 'organization.created' || eventType === 'organization.updated') {
        const { name, slug, image_url } = evt.data;

        try {
            // Try to find by name first, then update or create
            const [existing] = await db
                .select({ id: organization.id })
                .from(organization)
                .where(eq(organization.name, name))
                .limit(1);

            if (existing) {
                await db
                    .update(organization)
                    .set({ slug: slug ?? null, imageUrl: image_url ?? null, updatedAt: new Date() })
                    .where(eq(organization.id, existing.id));
            } else {
                await db.insert(organization).values({
                    name,
                    slug: slug ?? null,
                    imageUrl: image_url ?? null,
                });
            }
        } catch (err) {
            console.error('[webhook/clerk] Error upserting organization:', err);
            return new Response('Database error', { status: 500 });
        }
    }

    // ── organizationMembership.created / deleted ─────────────────────────────
    if (
        eventType === 'organizationMembership.created' ||
        eventType === 'organizationMembership.deleted'
    ) {
        const { organization: orgData, public_user_data, role } = evt.data;

        try {
            const [org] = await db
                .select({ id: organization.id })
                .from(organization)
                .where(eq(organization.slug, orgData.slug ?? ''))
                .limit(1);

            const memberEmail = public_user_data.identifier;
            const [member] = await db
                .select({ id: user.id })
                .from(user)
                .where(eq(user.email, memberEmail))
                .limit(1);

            if (org && member) {
                if (eventType === 'organizationMembership.created') {
                    // Delete any existing membership first (safe upsert without unique constraint assumption)
                    await db
                        .delete(organizationUser)
                        .where(
                            eq(organizationUser.organizationId, org.id)
                        )
                        .catch(() => { /* ignore */ });

                    await db.insert(organizationUser).values({
                        organizationId: org.id,
                        userId: member.id,
                        role: sanitizeRole(role),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
                } else {
                    // organizationMembership.deleted
                    await db
                        .delete(organizationUser)
                        .where(
                            eq(organizationUser.organizationId, org.id)
                        )
                        .catch(() => { /* already deleted */ });
                }
            }
        } catch (err) {
            console.error('[webhook/clerk] Error handling membership event:', err);
            return new Response('Database error', { status: 500 });
        }
    }

    return new Response('', { status: 200 });
}
