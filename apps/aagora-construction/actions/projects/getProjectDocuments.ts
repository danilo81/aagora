'use server';

import { db, projectDocument } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { ProjectDocument } from "@/types/types";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function getProjectDocuments(projectId: string): Promise<ProjectDocument[]> {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return [];

        const docs = await db.select().from(projectDocument)
            .where(eq(projectDocument.projectId, projectId))
            .orderBy(desc(projectDocument.createdAt));

        return docs.map(d => ({
            ...d,
            createdAt: d.createdAt.toISOString()
        })) as any;
    } catch (error) {
        console.error('Error fetching documents:', error);
        return [];
    }
}