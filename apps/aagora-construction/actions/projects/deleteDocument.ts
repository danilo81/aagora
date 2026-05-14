'use server';

import { db, projectDocument } from '@workspace/db';
import { eq, and, like } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function deleteDocument(id: string, projectId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const [doc] = await db.select().from(projectDocument).where(eq(projectDocument.id, id)).limit(1);
        if (!doc) return { success: false, error: 'Documento no encontrado.' };

        if (doc.isFolder) {
            const childFolderPath = doc.folder === "/" ? `/${doc.name}/` : `${doc.folder}${doc.name}/`;
            await db.delete(projectDocument).where(
                and(eq(projectDocument.projectId, projectId), like(projectDocument.folder, `${childFolderPath}%`))
            );
        }

        await db.delete(projectDocument).where(eq(projectDocument.id, id));
        revalidatePath(`/projects/${projectId}/documents`);
        return { success: true };
    } catch (error: any) {
        console.error('Delete error:', error);
        return { success: false, error: 'Error al eliminar el archivo.' };
    }
}