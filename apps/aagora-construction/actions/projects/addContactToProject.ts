'use server';

import { db, projectContact } from '@workspace/db';
import { eq, and } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function addContactToProject(projectId: string, contactId: string) {
    if (!projectId || !contactId) return { success: false, error: 'Datos de vinculación incompletos.' };
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'Sesión expirada.' };

        const [existing] = await db.select().from(projectContact).where(
            and(eq(projectContact.projectId, projectId), eq(projectContact.contactId, contactId))
        ).limit(1);
        if (existing) return { success: false, error: 'Este contacto ya está vinculado.' };

        await db.insert(projectContact).values({
            projectId,
            contactId,
            addedById: userId,
            permissions: {},
        });

        revalidatePath(`/projects/${projectId}`);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}