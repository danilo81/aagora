'use server';

import { db, supply } from '@workspace/db';
import { eq, and } from 'drizzle-orm';

export async function getCommunitySupplies(filterCategory?: string) {
    try {
        const supplies = await db.query.supply.findMany({
            where: filterCategory && filterCategory !== 'all'
                ? and(eq(supply.isPublic, true), eq(supply.category, filterCategory))
                : eq(supply.isPublic, true),
            with: {
                costs: {
                    with: {
                        supplier: true,
                    },
                },
            },
            orderBy: (supply, { desc }) => [desc(supply.createdAt)],
        });

        return { success: true, supplies };
    } catch (error: any) {
        console.error('Error fetching community supplies:', error);
        return { success: false, error: error.message };
    }
}
