'use server';

import { db, projectChangeOrder } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";

export async function updateProjectChangeOrder(id: string, data: { status: string }) {
    try {
        const [updated] = await db.update(projectChangeOrder)
            .set({ status: data.status })
            .where(eq(projectChangeOrder.id, id))
            .returning();

        revalidatePath(`/projects/${updated.projectId}/operations`);
        return { success: true, order: updated };
    } catch (error: any) {
        console.error('Error updating change order:', error);
        return { success: false, error: error.message };
    }
}