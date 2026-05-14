'use server';

import { db, project, bimDocument, bimTopic } from '@workspace/db';
import { eq } from 'drizzle-orm';

export async function getBimBoardData(projectId: string) {
    try {
        if (!projectId) throw new Error("ID de proyecto no proporcionado");

        const [proj] = await db.select({ id: project.id, title: project.title })
            .from(project).where(eq(project.id, projectId)).limit(1);

        if (!proj) throw new Error("Proyecto no encontrado");

        let [doc] = await db.select().from(bimDocument).where(eq(bimDocument.projectId, projectId)).limit(1);

        if (!doc) {
            const [created] = await db.insert(bimDocument).values({ projectId }).returning();
            doc = created;
        }

        const allTopics = await db.select().from(bimTopic)
            .where(eq(bimTopic.documentId, doc.id))
            .orderBy(bimTopic.order);

        const topicMap: Record<string, any> = {};
        const topicsWithChildren = JSON.parse(JSON.stringify(allTopics));
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

        return {
            success: true,
            project: JSON.parse(JSON.stringify(proj)),
            topics: rootTopics,
            document: JSON.parse(JSON.stringify(doc)),
            documentId: doc.id
        };
    } catch (error: any) {
        console.error('Error fetching BIM board data:', error);
        return { success: false, error: 'Error al cargar la plataforma BIM.' };
    }
}