'use server';

import { db } from '@workspace/db';
import { fixedAsset } from '@workspace/db/schema';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function createAsset(data: {
    name: string;
    code: string;
    brand?: string;
    model?: string;
    serialNumber?: string;
    purchasePrice: number;
    purchaseDate: string;
    location?: string;
    status: string;
}) {
    try {
        const userId = await getAuthUserId();
        if (!userId) {
            return { success: false, error: 'No autorizado' };
        }

        const [asset] = await db.insert(fixedAsset).values({
            name: data.name,
            code: data.code,
            brand: data.brand ?? null,
            model: data.model ?? null,
            serialNumber: data.serialNumber ?? null,
            purchasePrice: data.purchasePrice,
            purchaseDate: new Date(data.purchaseDate),
            location: data.location ?? null,
            status: data.status,
            userId,
        }).returning();

        revalidatePath('/library/construction/assets');
        return { success: true, asset };
    } catch (error: any) {
        console.error('Error creating asset:', error);
        if (error.message?.includes('unique')) {
            return { success: false, error: 'El código del activo ya existe.' };
        }
        return { success: false, error: 'Error al crear el activo' };
    }
}