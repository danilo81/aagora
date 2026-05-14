'use server';

import { db, projectContact, projectItem, level, projectConfig, project } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function deleteProject(id: string) {
    try {
        const userId = await requireProjectAccess(id);
        if (!userId) return { success: false, error: 'No autorizado' };

        await db.delete(projectContact).where(eq(projectContact.projectId, id));
        await db.delete(projectItem).where(eq(projectItem.projectId, id));
        await db.delete(level).where(eq(level.projectId, id));
        await db.delete(projectConfig).where(eq(projectConfig.projectId, id));
        await db.delete(project).where(eq(project.id, id));
        revalidatePath('/projects');
        return { success: true };
    } catch (error: any) { return { success: false, error: "Error al eliminar" }; }
}
