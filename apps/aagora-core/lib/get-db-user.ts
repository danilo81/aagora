'use server';

import { currentUser } from '@clerk/nextjs/server';
import { db, user } from '@workspace/db';
import { eq } from 'drizzle-orm';

/**
 * Finds the DB User record for the currently authenticated Clerk user.
 * Lookup is by email since Clerk userId (user_xxx) !== DB user.id (UUID).
 * Returns null if no Clerk session or no matching DB user.
 */
export async function getDbUser() {
    const clerkUser = await currentUser();
    if (!clerkUser) return null;

    const email = clerkUser.primaryEmailAddress?.emailAddress;
    if (!email) return null;

    const [dbUser] = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);

    return dbUser ?? null;
}
