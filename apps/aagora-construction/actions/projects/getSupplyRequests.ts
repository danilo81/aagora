'use server';

import { db, supplyRequest } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { requireProjectAccess } from '@/lib/require-project-access';

export async function getSupplyRequests(projectId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return [];

        const requests = await db.query.supplyRequest.findMany({
            where: eq(supplyRequest.projectId, projectId),
            with: {
                supply: {
                    with: {
                        costs: { with: { supplier: true } }
                    }
                }
            },
            orderBy: [desc(supplyRequest.createdAt)]
        });

        return requests.map((r: any) => ({
            ...r,
            createdAt: r.createdAt.toISOString(),
            updatedAt: r.updatedAt.toISOString(),
            supply: {
                ...r.supply,
                costs: (r.supply.costs || []).map((c: any) => ({
                    ...c,
                    date: c.date.toISOString().split('T')[0]
                }))
            }
        }));
    } catch (error) {
        console.error('Error fetching supply requests:', error);
        return [];
    }
}