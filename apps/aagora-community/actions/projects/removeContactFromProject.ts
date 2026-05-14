'use server';

import { db, projectContact } from '@workspace/db';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function removeContactFromProject(projectId: string, contactId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        await db.delete(projectContact).where(
            and(eq(projectContact.projectId, projectId), eq(projectContact.contactId, contactId))
        );
        revalidatePath(`/projects/${projectId}`);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
