'use server';

import { db, bimTopic, bimDocument, siteLog } from '@workspace/db';
import { eq, sql } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";
import { BimTopicStatus } from "@/types/types";

export async function upsertBimTopic(data: {
    id?: string;
    documentId: string;
    projectId: string;
    parentId?: string | null;
    title: string;
    content?: string | null;
    status: BimTopicStatus;
    order: number;
}) {
    try {
        const userId = await getAuthUserId();
        if (!userId) throw new Error("No autorizado");

        let topic;
        if (data.id) {
            const [updated] = await db.update(bimTopic)
                .set({
                    title: data.title,
                    content: data.content ?? null,
                    status: data.status,
                    order: data.order
                })
                .where(eq(bimTopic.id, data.id))
                .returning();
            topic = updated;
        } else {
            const [created] = await db.insert(bimTopic).values({
                documentId: data.documentId,
                parentId: data.parentId || null,
                title: data.title,
                content: data.content || '',
                status: data.status,
                order: data.order
            }).returning();
            topic = created;
        }

        await db.insert(siteLog).values({
            projectId: data.projectId,
            authorId: userId,
            type: 'info',
            content: data.id
                ? `SECCIÓN BIM ACTUALIZADA: Se ha modificado "${data.title}" (${data.status}).`
                : `SECCIÓN BIM CREADA: Se ha añadido "${data.title}" al expediente técnico.`,
            date: new Date()
        }).catch(() => null);

        // Increment version
        const [doc] = await db.select({ version: bimDocument.version })
            .from(bimDocument).where(eq(bimDocument.id, data.documentId)).limit(1);
        if (doc) {
            await db.update(bimDocument)
                .set({ version: (doc.version || 1) + 1 })
                .where(eq(bimDocument.id, data.documentId));
        }

        revalidatePath(`/projects/${data.projectId}/documentation`);
        revalidatePath(`/projects/${data.projectId}/board`);

        return { success: true, topic };
    } catch (error: any) {
        console.error('Error upserting BIM topic:', error);
        return { success: false, error: 'Error al persistir los cambios en el tópico.' };
    }
}