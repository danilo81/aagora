'use server';

import { db } from '@workspace/db';
import { supply, supplyCost } from '@workspace/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function deleteSupplyCost(costId: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const existingCost = await db.query.supplyCost.findFirst({ where: eq(supplyCost.id, costId), columns: { supplyId: true } });
        if (!existingCost) return { success: false, error: 'Costo no encontrado.' };

        const ownerSupply = await db.query.supply.findFirst({ where: eq(supply.id, existingCost.supplyId), columns: { userId: true } });
        if (!ownerSupply || ownerSupply.userId !== userId) return { success: false, error: 'No tienes permisos para eliminar este costo.' };

        await db.delete(supplyCost).where(eq(supplyCost.id, costId));
        revalidatePath('/library/construction/supplies');
        return { success: true };
    } catch (error) {
        console.error('Error deleting supply cost:', error);
        return { success: false, error: 'Fallo al eliminar el costo.' };
    }
}