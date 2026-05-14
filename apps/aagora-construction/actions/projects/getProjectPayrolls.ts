'use server';

import { db, payroll } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { requireProjectAccess } from '@/lib/require-project-access';

export async function getProjectPayrolls(projectId: string) {
    if (!projectId) return { success: false, error: 'Project ID is required' };

    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const payrolls = await db.query.payroll.findMany({
            where: eq(payroll.projectId, projectId),
            with: {
                entries: { with: { contact: true } }
            },
            orderBy: [desc(payroll.endDate)]
        });

        return { success: true, payrolls };
    } catch (error: any) {
        console.error('Error fetching project payrolls:', error);
        return { success: false, error: error.message };
    }
}