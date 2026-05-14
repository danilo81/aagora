'use server';

import { db } from '@workspace/db';
import { fixedAsset } from '@workspace/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function deleteAsset(id: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const existing = await db.query.fixedAsset.findFirst({
            where: eq(fixedAsset.id, id),
            columns: { userId: true },
        });
        if (!existing || existing.userId !== userId) {
            return { success: false, error: 'No autorizado o el activo no existe.' };
        }

        await db.delete(fixedAsset).where(eq(fixedAsset.id, id));

        revalidatePath('/library/construction/assets');
        return { success: true };
    } catch (error) {
        console.error('Error deleting asset:', error);
        return { success: false, error: 'Error al eliminar el activo' };
    }
}