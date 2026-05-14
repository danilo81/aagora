'use server';
import { db, purchaseOrder } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function deletePurchaseOrder(id: string) {
    try {
        const [order] = await db.select({ projectId: purchaseOrder.projectId })
            .from(purchaseOrder).where(eq(purchaseOrder.id, id)).limit(1);

        if (!order) return { success: false, error: 'Orden no encontrada' };

        const userId = await requireProjectAccess(order.projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        await db.delete(purchaseOrder).where(eq(purchaseOrder.id, id));

        revalidatePath(`/projects/${order.projectId}/operations`);
        revalidatePath(`/projects/${order.projectId}/shop`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting purchase order:', error);
        return { success: false, error: 'Error al eliminar la orden de compra.' };
    }
}