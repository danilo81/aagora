'use server';

import { db } from '@workspace/db';
import { fixedAsset } from '@workspace/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function updateAsset(id: string, data: {
    name?: string;
    code?: string;
    brand?: string;
    model?: string;
    serialNumber?: string;
    purchasePrice?: number;
    purchaseDate?: string;
    location?: string;
    status?: string;
}) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const existing = await db.query.fixedAsset.findFirst({
            where: and(eq(fixedAsset.id, id), eq(fixedAsset.userId, userId)),
            columns: { id: true },
        });
        if (!existing) return { success: false, error: 'No autorizado o el activo no existe.' };

        const setData: Record<string, any> = { ...data, updatedAt: new Date() };
        if (data.purchaseDate) setData.purchaseDate = new Date(data.purchaseDate);

        const [asset] = await db.update(fixedAsset).set(setData).where(eq(fixedAsset.id, id)).returning();

        revalidatePath('/library/construction/assets');
        return { success: true, asset };
    } catch (error: any) {
        console.error('Error updating asset:', error);
        if (error.message?.includes('unique')) {
            return { success: false, error: 'El código del activo ya está en uso.' };
        }
        return { success: false, error: 'Error al actualizar el activo' };
    }
}