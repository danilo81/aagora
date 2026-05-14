'use server';

import { db, warehouseMovement, purchaseOrder, purchaseOrderItem, supplyRequest } from '@workspace/db';
import { eq, and, inArray } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { CreateWarehouseMovementData } from "@/types/types";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function createWarehouseEntry(data: CreateWarehouseMovementData) {
    try {
        const userId = await requireProjectAccess(data.projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const movs = [];
        for (const item of data.items) {
            const [m] = await db.insert(warehouseMovement).values({
                type: 'entry',
                quantity: item.quantity,
                notes: data.notes,
                projectId: data.projectId,
                supplyId: item.supplyId,
                purchaseOrderId: data.purchaseOrderId || null,
            }).returning();
            movs.push(m);
        }

        if (data.purchaseOrderId) {
            const poItems = await db.select({ supplyId: purchaseOrderItem.supplyId })
                .from(purchaseOrderItem)
                .where(eq(purchaseOrderItem.purchaseOrderId, data.purchaseOrderId));

            if (poItems.length > 0) {
                const supplyIds = poItems.map(i => i.supplyId);
                await db.update(supplyRequest)
                    .set({ status: 'almacenado' })
                    .where(and(
                        eq(supplyRequest.projectId, data.projectId),
                        inArray(supplyRequest.supplyId, supplyIds),
                        eq(supplyRequest.status, 'procesado')
                    ));

                await db.update(purchaseOrder)
                    .set({ status: 'completado' })
                    .where(eq(purchaseOrder.id, data.purchaseOrderId));
            }
        }

        revalidatePath(`/projects/${data.projectId}/operations`);
        revalidatePath(`/projects/${data.projectId}/shop`);
        revalidatePath(`/projects/${data.projectId}/warehouse`);
        return { success: true, movements: movs };
    } catch (error) {
        console.error('Error creating warehouse entry:', error);
        return { success: false, error: 'Error al registrar el ingreso a almacén.' };
    }
}