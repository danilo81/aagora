'use server';

import { db, projectContact } from '@workspace/db';
import { eq, and } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function leaveProject(projectId: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        // Since contacts are linked by contactId (not userId directly),
        // we can only remove contacts that were added by this user or match the userId
        // Without user email, we remove any project contact added by this user
        await db.delete(projectContact).where(
            and(eq(projectContact.projectId, projectId), eq(projectContact.addedById, userId))
        );

        revalidatePath('/projects');
        revalidatePath('/dashboard');

        return { success: true };
    } catch (error: any) {
        console.error("Leave project error:", error);
        return { success: false, error: "Fallo al abandonar el proyecto." };
    }
}