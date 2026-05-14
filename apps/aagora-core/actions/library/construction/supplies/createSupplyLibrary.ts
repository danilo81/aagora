'use server';

import { db } from '@workspace/db';
import { supply, supplyCost } from '@workspace/db/schema';
import { eq, ilike, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function createSupplyLibrary(data: {
    typology: string;
    description: string;
    unit: string;
    price: number;
    tag?: string;
    supplierId?: string | null;
    supplierPrice?: number | null;
    supplierPriceDate?: string | null;
}) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'No autorizado' };

        const existing = await db.query.supply.findFirst({
            where: and(eq(supply.userId, currentUserId), ilike(supply.description, data.description)),
        });
        if (existing) return { success: false, error: `El insumo "${data.description}" ya existe en tu catálogo maestro.` };

        const [newSupply] = await db.insert(supply).values({
            typology: data.typology,
            description: data.description,
            unit: data.unit,
            price: data.price,
            tag: data.tag ?? null,
            userId: currentUserId,
        }).returning();

        if (data.supplierId) {
            await db.insert(supplyCost).values({
                supplyId: newSupply.id,
                supplierId: data.supplierId,
                price: data.supplierPrice ?? 0,
                date: data.supplierPriceDate ? new Date(data.supplierPriceDate) : new Date(),
                isPreferred: true,
            });
        }

        revalidatePath('/library/construction/supplies');
        return { success: true, supply: newSupply };
    } catch (error) {
        console.error('Error creating supply:', error);
        return { success: false, error: 'Error interno al crear el insumo.' };
    }
}