'use server';

import { db, projectDocument, siteLog } from '@workspace/db';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function createProjectFolder(projectId: string, folderName: string, parentFolder: string = "/") {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const [folder] = await db.insert(projectDocument).values({
            projectId,
            name: folderName,
            type: 'folder',
            size: 0,
            url: '',
            folder: parentFolder,
            isFolder: true,
            authorName: 'Usuario Aagora',
            userId
        }).returning();

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'info',
            content: `CARPETA CREADA: Se ha creado la carpeta "${folderName}" en ${parentFolder}.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${projectId}/documentation`);
        return { success: true, folder };
    } catch (error) {
        console.error('Error creating folder:', error);
        return { success: false, error: 'Error al crear carpeta.' };
    }
}