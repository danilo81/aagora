'use server';

import { db, supply, supplyCost } from '@workspace/db';
import { revalidatePath } from "next/cache";
import { getAuthUserId } from '@/lib/clerk-auth';
import { Supply } from "@/types/types";

export async function createSupply(data: Omit<Supply, 'id'> & {
    supplierId?: string;
    supplierPrice?: number;
    supplierPriceDate?: string;
}) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const [newSupply] = await db.insert(supply).values({
            typology: data.typology,
            description: data.description,
            unit: data.unit,
            price: data.price,
            tag: data.tag,
            isPublic: data.isPublic,
            category: data.category,
            userId: userId,
        }).returning();

        if (data.supplierId && data.supplierId !== 'none') {
            await db.insert(supplyCost).values({
                supplyId: newSupply.id,
                supplierId: data.supplierId,
                price: data.supplierPrice || 0,
                date: data.supplierPriceDate ? new Date(data.supplierPriceDate) : new Date(),
                isPreferred: true
            });
        }
        revalidatePath('/library/construction/supplies');
        return { success: true, supply: newSupply };
    } catch (error: any) {
        console.error('Error in createSupply:', error);
        return { success: false, error: error.message };
    }
}