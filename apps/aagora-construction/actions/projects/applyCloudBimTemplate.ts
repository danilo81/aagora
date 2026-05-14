'use server';

import { db, libraryFile, bimDocument, bimTopic, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function applyCloudBimTemplate(projectId: string, fileId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const [file] = await db.select().from(libraryFile).where(eq(libraryFile.id, fileId)).limit(1);

        if (!file || !file.publicUrl) {
            throw new Error("Plantilla no encontrada");
        }

        const [doc] = await db.select().from(bimDocument).where(eq(bimDocument.projectId, projectId)).limit(1);

        if (!doc) throw new Error("Documento no encontrado");

        const response = await fetch(file.publicUrl);
        if (!response.ok) {
            throw new Error(`Error al leer archivo de plantilla: ${response.statusText}`);
        }

        const topicsData: any[] = await response.json();

        await db.delete(bimTopic).where(eq(bimTopic.documentId, doc.id));

        const oldToNew = new Map<string, string>();
        let remaining = [...topicsData];

        while (remaining.length > 0) {
            const readyToProcess = remaining.filter(t => !t.parentId || oldToNew.has(t.parentId));

            if (readyToProcess.length === 0) {
                console.warn(`Orphaned topics detected: ${remaining.length}`);
                readyToProcess.push(...remaining);
                readyToProcess.forEach(t => t.parentId = null);
            }

            for (const t of readyToProcess) {
                const newParentId = t.parentId ? oldToNew.get(t.parentId) : null;
                const [newTopic] = await db.insert(bimTopic).values({
                    documentId: doc.id,
                    parentId: newParentId ?? null,
                    title: t.title,
                    order: t.order,
                    status: t.status,
                    content: t.content
                }).returning();
                oldToNew.set(t.id, newTopic.id);
            }

            remaining = remaining.filter(t => !readyToProcess.includes(t));
        }

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'info',
            content: `PLANTILLA DESDE NUBE: Se importó la plantilla "${file.name}" al módulo de documentación.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${projectId}/documentation`);
        return { success: true };
    } catch (error: any) {
        console.error('Error applying cloud template:', error);
        return { success: false, error: 'Fallo al aplicar la plantilla en la nube.' };
    }
}