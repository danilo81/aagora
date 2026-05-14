'use server';

import { db, bimDocument, bimTopic } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { requireProjectAccess } from '@/lib/require-project-access';

export async function getBimDocument(projectId: string) {
    try {
        if (!projectId) throw new Error("ID de proyecto no proporcionado");

        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        let [doc] = await db.select().from(bimDocument).where(eq(bimDocument.projectId, projectId)).limit(1);

        if (!doc) {
            const [created] = await db.insert(bimDocument).values({ projectId }).returning();
            doc = created;
        }

        const allTopics = await db.select().from(bimTopic)
            .where(eq(bimTopic.documentId, doc.id))
            .orderBy(bimTopic.order);

        const topicsWithChildren = JSON.parse(JSON.stringify(allTopics));
        const topicMap: Record<string, any> = {};
        topicsWithChildren.forEach((t: any) => {
            t.children = [];
            topicMap[t.id] = t;
        });

        const rootTopics: any[] = [];
        topicsWithChildren.forEach((t: any) => {
            if (t.parentId && topicMap[t.parentId]) {
                topicMap[t.parentId].children.push(t);
            } else {
                rootTopics.push(t);
            }
        });

        return { success: true, topics: rootTopics, documentId: doc.id };
    } catch (error: any) {
        console.error('Error fetching BIM document:', error);
        return { success: false, error: 'Error al cargar la documentación técnica BIM.' };
    }
}