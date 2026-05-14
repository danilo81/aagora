'use server';

import { db, supply } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { getAuthUserId } from '@/lib/clerk-auth';

export async function deleteSupply(id: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const [supplyToDelete] = await db.select({ userId: supply.userId })
            .from(supply).where(eq(supply.id, id)).limit(1);

        if (!supplyToDelete || supplyToDelete.userId !== userId) {
            return { success: false, error: 'No autorizado.' };
        }

        await db.delete(supply).where(eq(supply.id, id));

        revalidatePath('/library/construction/supplies');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}