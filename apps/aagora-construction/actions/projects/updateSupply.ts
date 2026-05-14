'use server';

import { db, supply } from '@workspace/db';
import { updateSupplyDataSchema, type UpdateSupplyData } from '@workspace/db/validation';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { getAuthUserId } from '@/lib/clerk-auth';

export async function updateSupply(id: string, data: UpdateSupplyData) {
    const parsed = updateSupplyDataSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const [supplyToUpdate] = await db.select({ userId: supply.userId })
            .from(supply).where(eq(supply.id, id)).limit(1);

        if (!supplyToUpdate || supplyToUpdate.userId !== userId) {
            return { success: false, error: 'No autorizado.' };
        }

        const [updatedSupply] = await db.update(supply).set(parsed.data).where(eq(supply.id, id)).returning();

        revalidatePath('/library/construction/supplies');
        return { success: true, supply: updatedSupply };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
