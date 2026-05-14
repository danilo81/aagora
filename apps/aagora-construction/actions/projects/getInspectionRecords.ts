'use server';

import { db, inspectionRecord } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { requireProjectAccess } from '@/lib/require-project-access';

export async function getInspectionRecords(projectId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return [];

        const records = await db.query.inspectionRecord.findMany({
            where: eq(inspectionRecord.projectId, projectId),
            with: {
                projectItem: {
                    with: {
                        item: {
                            with: {
                                qualityControls: { with: { subPoints: true } }
                            }
                        }
                    }
                },
                checks: true,
            },
            orderBy: [desc(inspectionRecord.date)]
        });

        return records.map((r: any) => ({
            ...r,
            date: r.date.toISOString().split('T')[0],
            createdAt: r.createdAt.toISOString(),
            updatedAt: r.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error('Error fetching inspection records:', error);
        return [];
    }
}