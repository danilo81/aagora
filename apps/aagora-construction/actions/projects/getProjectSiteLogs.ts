'use server';

import { db, siteLog } from '@workspace/db';
import { eq, and, desc } from 'drizzle-orm';
import { requireProjectAccess } from '@/lib/require-project-access';

export async function getProjectSiteLogs(projectId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const siteLogs = await db.select().from(siteLog)
            .where(and(eq(siteLog.projectId, projectId), eq(siteLog.type, 'progress')))
            .orderBy(desc(siteLog.date));

        return {
            success: true,
            logs: siteLogs.map(log => ({
                id: log.id,
                date: log.date.toISOString(),
                type: log.type,
                content: log.content,
                author: 'Usuario'
            }))
        };
    } catch (error: any) {
        console.error("Error fetching project logs:", error);
        return { success: false, error: "Error al obtener el historial." };
    }
}