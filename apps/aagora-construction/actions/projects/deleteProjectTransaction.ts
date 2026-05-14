'use server';

import { db, projectTransaction } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";

export async function deleteProjectTransaction(id: string) {
    try {
        const [transaction] = await db.delete(projectTransaction)
            .where(eq(projectTransaction.id, id))
            .returning();

        revalidatePath(`/projects/${transaction.projectId}/operations`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting project transaction:', error);
        return { success: false, error: 'Error al eliminar el movimiento.' };
    }
}