'use server';

import { db, contact, projectContact, siteLog } from '@workspace/db';
import { eq, and, ilike } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function inviteCollaborator(projectId: string, email: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'Sesión no válida o expirada. Por favor, inicie sesión nuevamente.' };

        let [existingContact] = await db.select().from(contact).where(
            and(ilike(contact.email, email), eq(contact.userId, userId))
        ).limit(1);

        if (!existingContact) {
            const [created] = await db.insert(contact).values({
                name: email.split('@')[0].toUpperCase(),
                email: email,
                phone: '',
                type: 'personal',
                status: 'active',
                userId: userId
            }).returning();
            existingContact = created;
        }

        const [existingLink] = await db.select().from(projectContact).where(
            and(eq(projectContact.projectId, projectId), eq(projectContact.contactId, existingContact.id))
        ).limit(1);

        if (!existingLink) {
            await db.insert(projectContact).values({
                projectId,
                contactId: existingContact.id,
                addedById: userId,
                permissions: {}
            });
        }

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'info',
            content: `COLABORACIÓN ACTIVADA: "${email}" ha sido vinculado al equipo técnico del proyecto.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${projectId}`);
        revalidatePath('/projects');

        return { success: true };
    } catch (error: any) {
        console.error("Invite error:", error);
        return { success: false, error: 'Fallo al procesar la invitación.' };
    }
}