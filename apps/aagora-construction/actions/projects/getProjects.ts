'use server';

import { db, project } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getProjects() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        const projects = await db.select().from(project)
            .where(eq(project.authorId, userId))
            .orderBy(desc(project.createdAt));

        return JSON.parse(JSON.stringify(projects.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            imageUrl: p.imageUrl,
            client: p.client,
            location: p.location,
            projectType: p.projectType,
            area: p.area,
            status: p.status,
            authorId: p.authorId,
            createdAt: p.createdAt.toISOString(),
        }))));
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}