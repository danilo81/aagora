'use server';

import { db } from '@workspace/db';
import { supply, supplyCost, contact } from '@workspace/db/schema';
import { eq, asc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getSuppliesLibrary() {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return [];

        const supplies = await db.query.supply.findMany({
            where: eq(supply.userId, currentUserId),
            orderBy: asc(supply.description),
            with: {
                costs: {
                    orderBy: (c, { desc }) => [desc(c.date)],
                    with: { supplier: true },
                },
            },
        });

        return supplies.map((s) => ({
            ...s,
            updatedAt: s.updatedAt.toISOString(),
            costs: s.costs.map((c) => ({
                ...c,
                date: c.date.toISOString().split('T')[0],
            })),
        }));
    } catch (error) {
        console.error('Error fetching supplies:', error);
        return [];
    }
}