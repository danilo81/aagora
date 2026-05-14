'use server';

import { db, bimTopic, siteLog } from '@workspace/db';
import { eq, and, isNull, sql } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function createTopicWithChildren(data: {
    documentId: string;
    projectId: string;
    parentId?: string | null;
    title: string;
    children: string[];
}) {
    try {
        const userId = await getAuthUserId();
        if (!userId) throw new Error("No autorizado");

        if (!data.documentId) throw new Error("Document ID es requerido");

        const countResult = await db.select({ count: sql<number>`count(*)` })
            .from(bimTopic)
            .where(
                data.parentId
                    ? and(eq(bimTopic.documentId, data.documentId), eq(bimTopic.parentId, data.parentId))
                    : and(eq(bimTopic.documentId, data.documentId), isNull(bimTopic.parentId))
            );
        const count = Number(countResult[0]?.count || 0);

        const [parent] = await db.insert(bimTopic).values({
            documentId: data.documentId,
            parentId: data.parentId || null,
            title: data.title,
            status: 'in_progress',
            order: count,
            content: ''
        }).returning();

        await db.insert(siteLog).values({
            projectId: data.projectId,
            authorId: userId,
            type: 'info',
            content: `SECCIÓN BIM CREADA: Se ha añadido "${data.title}" al documento técnico del proyecto.`,
            date: new Date()
        }).catch(() => null);

        const validChildrenTitles = (data.children || []).filter(title => title.trim() !== '');
        if (validChildrenTitles.length > 0) {
            await db.insert(bimTopic).values(
                validChildrenTitles.map((title, i) => ({
                    documentId: data.documentId,
                    parentId: parent.id,
                    title,
                    status: 'in_progress',
                    order: i,
                    content: ''
                }))
            );
        }

        revalidatePath(`/projects/${data.projectId}/documentation`);
        revalidatePath(`/projects/${data.projectId}/board`);
        return { success: true, topic: parent };
    } catch (error: any) {
        console.error('Error creating topic with children:', error);
        return { success: false, error: 'Fallo al crear el tópico y sus sub-secciones.' };
    }
}