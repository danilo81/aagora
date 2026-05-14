'use server';

import { db, constructionItem, projectItem } from '@workspace/db';
import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { getAuthUserId } from '@/lib/clerk-auth';

export async function deleteConstructionItem(id: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const [itemToDelete] = await db.select({ userId: constructionItem.userId })
            .from(constructionItem).where(eq(constructionItem.id, id)).limit(1);

        if (!itemToDelete || itemToDelete.userId !== userId) {
            return { success: false, error: 'No autorizado o el ítem no te pertenece.' };
        }

        const countResult = await db.select({ count: sql<number>`count(*)` })
            .from(projectItem).where(eq(projectItem.itemId, id));
        const usageCount = Number(countResult[0]?.count || 0);

        if (usageCount > 0) {
            return {
                success: false,
                error: `No se puede eliminar: Este ítem está asignado a ${usageCount} proyecto(s). Desvincúlelo primero.`
            };
        }

        await db.delete(constructionItem).where(eq(constructionItem.id, id));

        revalidatePath('/library/construction/items');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting construction item:', error);
        return { success: false, error: error.message };
    }
}