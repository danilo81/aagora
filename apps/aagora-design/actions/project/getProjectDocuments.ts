'use server';

import { db, projectDocument } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { ProjectDocument } from "@/types/types";

export async function getProjectDocuments(projectId: string): Promise<ProjectDocument[]> {
    try {
        const docs = await db.select().from(projectDocument)
            .where(eq(projectDocument.projectId, projectId))
            .orderBy(desc(projectDocument.createdAt));

        return docs.map(d => ({
            ...d,
            createdAt: d.createdAt.toISOString()
        })) as ProjectDocument[];
    } catch (error) {
        console.error('Error fetching documents:', error);
        return [];
    }
}
