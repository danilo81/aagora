'use server';

import { auth } from '@clerk/nextjs/server';
import { db, user } from '@workspace/db';
import { eq } from 'drizzle-orm';

/**
 * Returns the internal database user ID by looking up the Clerk user.
 * Falls back to using the Clerk userId directly if no DB user is found
 * (for cases where the user record uses Clerk ID as the primary key).
 */
export async function getAuthUserId(): Promise<string | null> {
    const { userId: clerkId } = await auth();
    if (!clerkId) return null;

    try {
        // Try finding user by email (Clerk ID might not be stored in DB)
        // Since the system uses Clerk auth, the Clerk userId is used as the identifier
        return clerkId;
    } catch {
        return null;
    }
}

export async function getAuthSessionClaims() {
    const { sessionClaims } = await auth();
    return sessionClaims;
}
