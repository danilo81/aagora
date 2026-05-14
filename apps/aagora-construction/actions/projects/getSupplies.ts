'use server';

import { db, supply } from '@workspace/db';
import { eq, asc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getSupplies(userIdParam?: string) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'No autorizado' };

        const supplies = await db.query.supply.findMany({
            where: eq(supply.userId, currentUserId),
            with: {
                costs: { with: { supplier: true } }
            },
            orderBy: [asc(supply.description)],
        });

        const formattedSupplies = supplies.map((s: any) => ({
            ...s,
            costs: s.costs.map((c: any) => ({
                ...c,
                date: c.date.toISOString().split('T')[0]
            }))
        }));

        return { success: true, supplies: JSON.parse(JSON.stringify(formattedSupplies)) };
    } catch (error: any) {
        console.error('Error in getSupplies:', error);
        return { success: false, error: error.message };
    }
}