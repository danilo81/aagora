'use server';

import { db, constructionItem, constructionItemSupply, supply } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { getAuthUserId } from '@/lib/clerk-auth';
import { ConstructionItem } from "@/types/types";

export async function createConstructionItem(data: Omit<ConstructionItem, 'id' | 'userId'>, supplies: { supplyId: string, quantity: number }[]) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const totalCost = await calculateTotalCost(supplies);

        const [newItem] = await db.insert(constructionItem).values({
            chapter: data.chapter,
            description: data.description,
            unit: data.unit,
            userId: userId,
            total: totalCost,
            performance: data.performance || 1,
        }).returning();

        if (supplies.length > 0) {
            await db.insert(constructionItemSupply).values(
                supplies.map(s => ({
                    itemId: newItem.id,
                    supplyId: s.supplyId,
                    quantity: s.quantity
                }))
            );
        }

        revalidatePath('/library/construction/items');
        return { success: true, item: newItem };
    } catch (error: any) {
        console.error('Error in createConstructionItem:', error);
        return { success: false, error: error.message };
    }
}

async function calculateTotalCost(supplies: { supplyId: string, quantity: number }[]): Promise<number> {
    let total = 0;
    for (const s of supplies) {
        const [supplyDetails] = await db.select().from(supply).where(eq(supply.id, s.supplyId)).limit(1);
        if (supplyDetails) {
            total += s.quantity * (supplyDetails.price || 0);
        }
    }
    return total;
}