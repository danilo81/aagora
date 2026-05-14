'use server';

import { db, projectChangeOrder, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function deleteProjectChangeOrder(id: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const [changeOrder] = await db.select({
            id: projectChangeOrder.id,
            projectId: projectChangeOrder.projectId,
            status: projectChangeOrder.status,
            number: projectChangeOrder.number,
            description: projectChangeOrder.description
        }).from(projectChangeOrder).where(eq(projectChangeOrder.id, id)).limit(1);

        if (!changeOrder) {
            return { success: false, error: "Orden de cambio no encontrada." };
        }

        if (changeOrder.status === 'Aprobada') {
            return {
                success: false,
                error: "No se puede eliminar una orden de cambio aprobada. Por favor, cree una deducción para revertir el impacto financiero."
            };
        }

        await db.insert(siteLog).values({
            projectId: changeOrder.projectId,
            authorId: userId,
            type: 'info',
            content: `ORDEN DE CAMBIO ELIMINADA: Se ha removido la ${changeOrder.number} (${changeOrder.description}).`,
            date: new Date()
        }).catch(() => null);

        await db.delete(projectChangeOrder).where(eq(projectChangeOrder.id, id));

        revalidatePath(`/projects/${changeOrder.projectId}/operations`);
        return { success: true, projectId: changeOrder.projectId };
    } catch (error: any) {
        console.error('Error deleting change order:', error);
        return { success: false, error: error.message };
    }
}