'use server';

import { db } from '@workspace/db';
import { supply } from '@workspace/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function updateSupplyLibrary(id: string, data: {
    typology?: string;
    description?: string;
    unit?: string;
    price?: number;
    tag?: string;
}) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'No autorizado' };

        const existing = await db.query.supply.findFirst({ where: eq(supply.id, id), columns: { userId: true } });
        if (!existing || existing.userId !== currentUserId) return { success: false, error: 'No tienes permisos para actualizar este insumo.' };

        const [updated] = await db.update(supply).set({ ...data, updatedAt: new Date() }).where(eq(supply.id, id)).returning();
        revalidatePath('/library/construction/supplies');
        return { success: true, supply: updated };
    } catch (error) {
        console.error('Error updating supply:', error);
        return { success: false, error: 'Fallo al actualizar el insumo.' };
    }
}