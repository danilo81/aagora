'use server';

import { db, projectTransaction, siteLog } from '@workspace/db';
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

export async function createProjectTransaction(data: CreateTransactionData) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const [newTransaction] = await db.insert(projectTransaction).values({
            projectId: data.projectId,
            amount: data.amount,
            type: data.type,
            category: data.category,
            description: data.description,
            date: data.date ? new Date(data.date) : new Date()
        }).returning();

        await db.insert(siteLog).values({
            projectId: data.projectId,
            authorId: userId,
            type: 'info',
            content: `MOVIMIENTO TESORERÍA (${data.type.toUpperCase()}): Se registró "${data.description}" por ${data.amount.toLocaleString('es-ES')} BOB en la categoría ${data.category.toUpperCase()}.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${data.projectId}/operations`);
        revalidatePath(`/projects/${data.projectId}/accounting`);
        return { success: true, transaction: newTransaction };
    } catch (error: any) {
        console.error('Error creating project transaction:', error);
        return { success: false, error: 'Error al registrar el movimiento.' };
    }
}