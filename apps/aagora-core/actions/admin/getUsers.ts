'use server';

import { db, user } from '@workspace/db';
import { desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/clerk-auth';
import { clerkClient } from '@clerk/nextjs/server';

export async function getUsers() {
    const isAdmin = await requireAdmin();
    if (!isAdmin) {
        console.error('[getUsers] requireAdmin() returned false — user lacks admin role or session is invalid');
        return [];
    }

    // Pull all users from Clerk (source of truth for auth)
    const client = await clerkClient();
    const { data: clerkUsers } = await client.users.getUserList({ limit: 500, orderBy: '-created_at' });

    // Find which Clerk users are missing from the local DB
    const dbUsers = await db.select({ email: user.email }).from(user);
    const dbEmails = new Set(dbUsers.map(u => u.email.toLowerCase()));

    const toInsert = clerkUsers
        .map(cu => {
            const email = cu.emailAddresses.find(e => e.id === cu.primaryEmailAddressId)?.emailAddress;
            if (!email || dbEmails.has(email.toLowerCase())) return null;
            const role = (cu.publicMetadata?.role as string | undefined) ?? 'usuario';
            const name = [cu.firstName, cu.lastName].filter(Boolean).join(' ') || email;
            return { name, email, role };
        })
        .filter((u): u is { name: string; email: string; role: string } => u !== null);

    // Sync missing Clerk users into local DB
    if (toInsert.length > 0) {
        await db.insert(user).values(toInsert).onConflictDoNothing();
    }

    // Return full list from local DB (now includes all Clerk users)
    const all = await db.select().from(user).orderBy(desc(user.createdAt));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return all.map(({ password: _password, ...u }) => u);
}
