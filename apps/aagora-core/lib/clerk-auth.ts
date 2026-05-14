'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { db, user } from '@workspace/db';
import { eq } from 'drizzle-orm';

export async function getAuthUserId(): Promise<string | null> {
    const { userId: clerkId } = await auth();
    if (!clerkId) return null;
    return clerkId;
}

export async function getAuthSessionClaims() {
    const { sessionClaims } = await auth();
    return sessionClaims;
}

/**
 * Checks if the currently authenticated user has admin/administrador role.
 *
 * Three-tier waterfall (stops as soon as a role is confirmed):
 *  1. auth() session claims — JWT, fast, may be stale after a recent role change
 *  2. currentUser()        — fresh Clerk backend API call, never stale
 *  3. local DB by email    — last resort if Clerk metadata has no role
 */
export async function requireAdmin(): Promise<boolean> {
    const isAdmin = (role?: string) => role === 'admin' || role === 'administrador';

    // 1. JWT session claims (fastest — already in the request)
    const { userId, sessionClaims } = await auth();
    if (!userId) return false;

    const jwtRole = (sessionClaims?.publicMetadata as Record<string, unknown> | undefined)?.role as string | undefined;
    if (isAdmin(jwtRole)) return true;

    // 2. Fresh Clerk API (handles recently-assigned roles not yet in the JWT)
    try {
        const clerkUser = await currentUser();
        if (clerkUser) {
            const freshRole = clerkUser.publicMetadata?.role as string | undefined;
            if (isAdmin(freshRole)) return true;

            // 3. Local DB fallback (covers users whose Clerk metadata was never synced)
            const email = clerkUser.emailAddresses?.[0]?.emailAddress;
            if (email) {
                const dbUser = await db.query.user.findFirst({
                    where: eq(user.email, email),
                    columns: { role: true },
                });
                if (isAdmin(dbUser?.role)) return true;
            }
        }
    } catch (err) {
        console.error('[requireAdmin] currentUser() failed, falling back to DB by userId', err);
    }

    return false;
}
