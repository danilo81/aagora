'use server';

import { db, valuation } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { requireProjectAccess } from '@/lib/require-project-access';

export async function getValuations(projectId: string) {
    if (!projectId) return { success: false, error: 'Project ID is required' };

    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const valuations = await db.query.valuation.findMany({
            where: eq(valuation.projectId, projectId),
            with: {
                items: {
                    with: {
                        projectItem: { with: { item: true } }
                    }
                }
            },
            orderBy: [desc(valuation.createdAt)]
        });

        return { success: true, valuations };
    } catch (error: any) {
        console.error('Error fetching valuations:', error);
        return { success: false, error: error.message };
    }
}