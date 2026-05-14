'use server';

import { db } from '@workspace/db';
import { supply } from '@workspace/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function deleteSupplyLibrary(id: string) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'No autorizado' };

        const existing = await db.query.supply.findFirst({ where: eq(supply.id, id), columns: { userId: true } });
        if (!existing || existing.userId !== currentUserId) return { success: false, error: 'No tienes permisos para eliminar este insumo.' };

        await db.delete(supply).where(eq(supply.id, id));

        revalidatePath('/library/construction/supplies');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting supply:', error);
        if (error.message?.includes('foreign key') || error.message?.includes('violates')) {
            return { success: false, error: 'No se puede eliminar el insumo porque está vinculado a una o más partidas.' };
        }
        return { success: false, error: 'Error al eliminar el insumo.' };
    }
}