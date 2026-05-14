'use server';

import { db, constructionItem, constructionItemSupply } from '@workspace/db';
import { updateConstructionItemDataSchema, type UpdateConstructionItemData } from '@workspace/db/validation';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { getAuthUserId } from '@/lib/clerk-auth';

export async function updateConstructionItem(id: string, data: UpdateConstructionItemData, supplies?: { supplyId: string, quantity: number }[]) {
    const parsed = updateConstructionItemDataSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const [itemToUpdate] = await db.select({ userId: constructionItem.userId })
            .from(constructionItem).where(eq(constructionItem.id, id)).limit(1);

        if (!itemToUpdate || itemToUpdate.userId !== userId) {
            return { success: false, error: 'No autorizado o el ítem no te pertenece.' };
        }

        if (supplies) {
            await db.delete(constructionItemSupply).where(eq(constructionItemSupply.itemId, id));
            if (supplies.length > 0) {
                await db.insert(constructionItemSupply).values(
                    supplies.map(s => ({
                        itemId: id,
                        supplyId: s.supplyId,
                        quantity: s.quantity
                    }))
                );
            }
        }

        const [result] = await db.update(constructionItem)
            .set(parsed.data)
            .where(eq(constructionItem.id, id))
            .returning();

        revalidatePath('/library/construction/items');
        return { success: true, item: result };
    } catch (error: any) {
        console.error('Error updating construction item:', error);
        return { success: false, error: error.message };
    }
}
