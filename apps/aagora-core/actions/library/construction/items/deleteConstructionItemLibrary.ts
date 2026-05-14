'use server';

import { db } from '@workspace/db';
import { constructionItem, constructionItemSupply, projectItem, qualityControl } from '@workspace/db/schema';
import { eq, count } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function deleteConstructionItemLibrary(id: string) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'No autorizado' };

        const existing = await db.query.constructionItem.findFirst({ where: eq(constructionItem.id, id), columns: { userId: true } });
        if (!existing || existing.userId !== currentUserId) return { success: false, error: 'No tienes permisos para eliminar esta partida.' };

        const usageResult = await db.select({ total: count() }).from(projectItem).where(eq(projectItem.itemId, id));
        const usageCount = usageResult[0]?.total ?? 0;
        if (usageCount > 0) {
            return {
                success: false,
                error: `No se puede eliminar la partida porque está siendo utilizada en ${usageCount} proyecto(s) activos. Debe desvincularla antes de proceder.`,
            };
        }

        await db.delete(constructionItemSupply).where(eq(constructionItemSupply.itemId, id));
        await db.delete(qualityControl).where(eq(qualityControl.itemId, id));
        await db.delete(constructionItem).where(eq(constructionItem.id, id));

        revalidatePath('/library/construction/items');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting construction item:', error);
        return { success: false, error: 'Error inesperado al intentar eliminar el ítem de la librería.' };
    }
}