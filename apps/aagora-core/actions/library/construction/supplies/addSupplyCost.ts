'use server';

import { db } from '@workspace/db';
import { supply, supplyCost } from '@workspace/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function addSupplyCost(data: {
    supplyId: string;
    supplierId: string;
    price: number;
    date: string;
    isPreferred?: boolean;
    notes?: string;
}) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'No autorizado' };

        const existing = await db.query.supply.findFirst({ where: eq(supply.id, data.supplyId), columns: { userId: true } });
        if (!existing || existing.userId !== currentUserId) return { success: false, error: 'No autorizado: El insumo no te pertenece.' };

        if (data.isPreferred) {
            await db.update(supplyCost).set({ isPreferred: false }).where(eq(supplyCost.supplyId, data.supplyId));
        }

        await db.insert(supplyCost).values({
            supplyId: data.supplyId,
            supplierId: data.supplierId,
            price: data.price,
            date: new Date(data.date),
            isPreferred: data.isPreferred ?? false,
            notes: data.notes ?? null,
        });

        if (data.isPreferred) {
            await db.update(supply).set({ updatedAt: new Date(), price: data.price }).where(eq(supply.id, data.supplyId));
        }

        revalidatePath('/library/construction/supplies');
        return { success: true };
    } catch (error) {
        console.error('Error adding supply cost:', error);
        return { success: false, error: 'Fallo al registrar el costo del proveedor.' };
    }
}