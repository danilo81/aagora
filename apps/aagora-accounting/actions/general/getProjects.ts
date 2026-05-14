'use server';

import { db, project } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getProjects() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];
        return await db
            .select({ id: project.id, title: project.title })
            .from(project)
            .where(eq(project.authorId, userId))
            .orderBy(desc(project.createdAt));
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}
