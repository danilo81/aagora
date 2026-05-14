'use server';

import { db, warehouseMovement } from '@workspace/db';
import { revalidatePath } from "next/cache";
import { WarehouseItem, CreateWarehouseMovementData } from "@/types/types";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function createWarehouseExit(data: CreateWarehouseMovementData) {
    try {
        const userId = await requireProjectAccess(data.projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const movements = [];
        for (const item of data.items) {
            const [m] = await db.insert(warehouseMovement).values({
                type: 'exit',
                quantity: item.quantity,
                notes: data.notes,
                projectId: data.projectId,
                supplyId: item.supplyId,
            }).returning();
            movements.push(m);
        }

        revalidatePath(`/projects/${data.projectId}/operations`);
        revalidatePath(`/projects/${data.projectId}/warehouse`);
        return { success: true, movements };
    } catch (error) {
        console.error('Error creating warehouse exit:', error);
        return { success: false, error: 'Error al registrar la salida de almacén.' };
    }
}