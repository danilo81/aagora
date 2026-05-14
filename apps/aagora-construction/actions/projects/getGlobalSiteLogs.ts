'use server';

import { db, siteLog, project } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getGlobalSiteLogs() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        const logs = await db.select({
            id: siteLog.id,
            date: siteLog.date,
            type: siteLog.type,
            content: siteLog.content,
            projectTitle: project.title,
        })
        .from(siteLog)
        .leftJoin(project, eq(siteLog.projectId, project.id))
        .where(eq(project.authorId, userId))
        .orderBy(desc(siteLog.date))
        .limit(10);

        return logs.map(log => ({
            id: log.id,
            date: log.date.toISOString(),
            type: log.type,
            content: log.content,
            projectName: log.projectTitle || '',
            author: 'Usuario'
        }));
    } catch (error) { return []; }
}