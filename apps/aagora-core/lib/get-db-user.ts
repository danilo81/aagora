'use server';

import { currentUser } from '@clerk/nextjs/server';
import { db, user } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getCloudflareContext } from '@opennextjs/cloudflare';

interface CloudflareEnv {
  RATE_LIMIT_KV?: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  };
}

/**
 * Finds the DB User record for the currently authenticated Clerk user.
 * Lookup is by email since Clerk userId (user_xxx) !== DB user.id (UUID).
 * Caches profile in Cloudflare KV for 5 minutes to minimize Neon DB load and edge latency.
 * Returns null if no Clerk session or no matching DB user.
 */
export async function getDbUser() {
    const clerkUser = await currentUser();
    if (!clerkUser) return null;

    const email = clerkUser.primaryEmailAddress?.emailAddress;
    if (!email) return null;

    const cacheKey = `user:profile:${email}`;
    let kv: CloudflareEnv['RATE_LIMIT_KV'] | undefined;

    try {
        const ctx = (await getCloudflareContext()) as any;
        kv = ctx.env?.RATE_LIMIT_KV;
        if (kv) {
            const cached = await kv.get(cacheKey);
            if (cached) {
                console.log(`[KV Cache] Hit for user: ${email}`);
                const parsed = JSON.parse(cached);
                if (parsed.createdAt) parsed.createdAt = new Date(parsed.createdAt);
                if (parsed.updatedAt) parsed.updatedAt = new Date(parsed.updatedAt);
                return parsed;
            }
        }
    } catch (err) {
        console.log('[KV Cache] KV binding not available or failed, falling back to direct DB lookup');
    }

    const [dbUser] = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);

    if (dbUser) {
        try {
            if (kv) {
                // Cache user profile for 5 minutes (300 seconds)
                await kv.put(cacheKey, JSON.stringify(dbUser), { expirationTtl: 300 });
                console.log(`[KV Cache] Stored profile for user: ${email}`);
            }
        } catch (err) {
            console.error('[KV Cache] Failed to write user profile cache:', err);
        }
    }

    return dbUser ?? null;
}
