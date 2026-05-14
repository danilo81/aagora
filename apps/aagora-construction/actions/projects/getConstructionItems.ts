'use server';

import { db, constructionItem } from '@workspace/db';
import { eq, asc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getConstructionItems(userIdParam?: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const items = await db.query.constructionItem.findMany({
            where: eq(constructionItem.userId, userId),
            with: {
                supplies: {
                    with: { supply: true }
                },
                qualityControls: {
                    with: { subPoints: true }
                }
            },
            orderBy: [asc(constructionItem.description)],
        });

        const formattedItems = items.map((item: any) => ({
            ...item,
            supplies: item.supplies.map((s: any) => ({
                id: s.supply.id,
                description: s.supply.description,
                unit: s.supply.unit,
                price: s.supply.price,
                quantity: s.quantity,
                subtotal: s.quantity * s.supply.price,
                typology: s.supply.typology
            }))
        }));

        return { success: true, items: JSON.parse(JSON.stringify(formattedItems)) };
    } catch (error: any) {
        console.error('Error in getConstructionItems:', error);
        return { success: false, error: error.message };
    }
}