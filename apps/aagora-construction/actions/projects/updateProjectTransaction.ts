'use server';

import { db, projectTransaction, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export interface CreateTransactionData {
    projectId: string;
    amount: number;
    type: 'ingreso' | 'egreso';
    category: string;
    description: string;
    date?: string;
}

export async function updateProjectTransaction(id: string, data: Partial<CreateTransactionData>) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const [updated] = await db.update(projectTransaction)
            .set({
                amount: data.amount,
                type: data.type,
                category: data.category,
                description: data.description,
                date: data.date ? new Date(data.date) : undefined
            })
            .where(eq(projectTransaction.id, id))
            .returning();

        await db.insert(siteLog).values({
            projectId: updated.projectId,
            authorId: userId,
            type: 'info',
            content: `MOVIMIENTO TESORERÍA ACTUALIZADO: Se modificó el registro "${updated.description}" (${updated.type.toUpperCase()}) por ${updated.amount.toLocaleString('es-ES')} BOB.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${updated.projectId}/operations`);
        revalidatePath(`/projects/${updated.projectId}/accounting`);
        return { success: true, transaction: updated };
    } catch (error: any) {
        console.error('Error updating project transaction:', error);
        return { success: false, error: 'Error al actualizar el movimiento.' };
    }
}