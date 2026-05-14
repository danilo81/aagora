'use server';

import { db } from '@workspace/db';
import { unit, supply, constructionItem } from '@workspace/db/schema';
import { and, eq, count } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function deleteUnit(id: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const existing = await db.query.unit.findFirst({
            where: eq(unit.id, id),
            columns: { name: true, abbreviation: true, userId: true },
        });

        if (!existing) {
            return { success: false, error: 'Unidad no encontrada.' };
        }
        if (existing.userId !== userId) {
            return { success: false, error: 'No tienes permisos para eliminar esta unidad.' };
        }

        const [supplyRows, itemRows] = await Promise.all([
            db.select({ supplyCount: count() }).from(supply).where(eq(supply.unit, existing.abbreviation)),
            db.select({ itemCount: count() }).from(constructionItem).where(eq(constructionItem.unit, existing.abbreviation)),
        ]);
        const supplyCount = supplyRows[0]?.supplyCount ?? 0;
        const itemCount = itemRows[0]?.itemCount ?? 0;

        if (supplyCount > 0) {
            return {
                success: false,
                error: `Inconsistencia detectada: No se puede eliminar la unidad "${existing.name}" porque está siendo utilizada por ${supplyCount} insumo(s).`,
            };
        }

        if (itemCount > 0) {
            return {
                success: false,
                error: `Inconsistencia detectada: No se puede eliminar la unidad "${existing.name}" porque está siendo utilizada por ${itemCount} item(s) de construcción.`,
            };
        }

        await db.delete(unit).where(and(eq(unit.id, id), eq(unit.userId, userId)));

        revalidatePath('/library/parameters/units');
        return { success: true };
    } catch (error) {
        console.error('Error deleting unit:', error);
        return { success: false, error: 'Error interno al intentar eliminar la unidad.' };
    }
}