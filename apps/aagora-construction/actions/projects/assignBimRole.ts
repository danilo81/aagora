'use server';

import { db, projectDocument } from '@workspace/db';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function assignBimRoleToDocument(projectId: string, documentId: string, role: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        await db.update(projectDocument)
            .set({ bimRole: null })
            .where(and(eq(projectDocument.projectId, projectId), eq(projectDocument.bimRole, role)));

        const [updatedDoc] = await db.update(projectDocument)
            .set({ bimRole: role })
            .where(eq(projectDocument.id, documentId))
            .returning();

        revalidatePath(`/projects/${projectId}/model`);
        revalidatePath(`/projects/${projectId}/design`);

        return { success: true, document: updatedDoc };
    } catch (error: any) {
        console.error("Error assigning BIM role:", error);
        return { success: false, error: "Error al asignar rol estructurado" };
    }
}