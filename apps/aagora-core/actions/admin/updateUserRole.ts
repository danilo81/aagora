'use server';

import { db, user } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { clerkClient } from '@clerk/nextjs/server';
import type { UserRole } from '../../types/types';
import { requireAdmin } from '@/lib/clerk-auth';

export async function updateUserRole(userId: string, newRole: UserRole) {
    try {
        if (!(await requireAdmin())) return null;

        const [updated] = await db
            .update(user)
            .set({ role: newRole, updatedAt: new Date() })
            .where(eq(user.id, userId))
            .returning();

        if (!updated) return null;

        // Sync role to Clerk publicMetadata so middleware/layout can read it from the JWT
        try {
            const client = await clerkClient();
            const clerkUsers = await client.users.getUserList({ emailAddress: [updated.email] });
            const clerkUser = clerkUsers.data[0];
            if (clerkUser) {
                await client.users.updateUserMetadata(clerkUser.id, {
                    publicMetadata: { role: newRole },
                });
            }
        } catch (clerkError) {
            console.error('updateUserRole: failed to sync role to Clerk metadata:', clerkError);
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _password, ...userWithoutPassword } = updated;
        return userWithoutPassword;
    } catch (error) {
        console.error(`Error al actualizar el rol para el usuario ${userId}:`, error);
        return null;
    }
}