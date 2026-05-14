'use server';

import { db, inspectionRecord, project } from '@workspace/db';
import { desc, eq, inArray } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getGlobalInspectionRecords() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        const userProjects = await db.select({ id: project.id }).from(project).where(eq(project.authorId, userId));
        if (userProjects.length === 0) return [];

        const projectIds = userProjects.map(p => p.id);

        const records = await db.query.inspectionRecord.findMany({
            limit: 10,
            where: inArray(inspectionRecord.projectId, projectIds),
            with: {
                project: true,
                projectItem: { with: { item: true } },
            },
            orderBy: [desc(inspectionRecord.date)]
        });

        return records.map((r: any) => ({
            ...r,
            projectName: r.project?.title || 'Sin Proyecto',
            itemName: r.projectItem?.item?.description || 'Sin Item',
            levelName: 'N/A',
            date: r.date.toISOString().split('T')[0],
        }));
    } catch (error) {
        console.error('Error fetching global inspection records:', error);
        return [];
    }
}
