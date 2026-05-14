'use server';

import { db } from '@workspace/db';
import { supplyCost } from '@workspace/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getSupplyCosts(supplyId: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        const costs = await db.query.supplyCost.findMany({
            where: eq(supplyCost.supplyId, supplyId),
            orderBy: desc(supplyCost.date),
            with: { supplier: true },
        });

        return costs.map((c) => ({
            ...c,
            date: c.date.toISOString().split('T')[0],
        }));
    } catch (error) {
        console.error('Error fetching supply costs:', error);
        return [];
    }
}