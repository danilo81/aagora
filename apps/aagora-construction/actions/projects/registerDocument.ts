'use server';

import { db, projectDocument, siteLog } from '@workspace/db';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function registerDocument(data: {
    projectId: string;
    name: string;
    type: string;
    size: number;
    url: string;
    source: 'local' | 'google_drive';
    folder?: string;
    isFolder?: boolean;
}) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const [doc] = await db.insert(projectDocument).values({
            projectId: data.projectId,
            name: data.name,
            type: data.type,
            size: data.size,
            url: data.url,
            folder: data.folder || "/",
            isFolder: data.isFolder || false,
            source: data.source,
            status: data.source === 'local' ? 'uploaded' : 'linked',
            authorName: 'Usuario Aagora',
            userId
        }).returning();

        await db.insert(siteLog).values({
            projectId: data.projectId,
            authorId: userId,
            type: 'info',
            content: `ARCHIVO REGISTRADO: Se ha añadido "${data.name}" (${data.source.toUpperCase()}) al expediente técnico.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${data.projectId}/documents`);
        return { success: true, document: doc };
    } catch (error) {
        console.error('Error registering document:', error);
        return { success: false, error: 'Error al vincular archivo.' };
    }
}