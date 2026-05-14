'use server';

import { db, warehouseMovement, supply } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { requireProjectAccess } from '@/lib/require-project-access';

export async function getProjectWarehouseMovements(projectId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return [];

        const movements = await db.select({
            id: warehouseMovement.id,
            type: warehouseMovement.type,
            quantity: warehouseMovement.quantity,
            notes: warehouseMovement.notes,
            projectId: warehouseMovement.projectId,
            supplyId: warehouseMovement.supplyId,
            purchaseOrderId: warehouseMovement.purchaseOrderId,
            itemId: warehouseMovement.itemId,
            levelId: warehouseMovement.levelId,
            authorId: warehouseMovement.authorId,
            createdAt: warehouseMovement.createdAt,
            supplyDescription: supply.description,
            supplyUnit: supply.unit,
        })
        .from(warehouseMovement)
        .leftJoin(supply, eq(warehouseMovement.supplyId, supply.id))
        .where(eq(warehouseMovement.projectId, projectId))
        .orderBy(desc(warehouseMovement.createdAt));

        return movements.map(m => ({
            ...m,
            date: m.createdAt.toISOString(),
            supplyName: m.supplyDescription ?? '',
            unit: m.supplyUnit ?? '',
            itemName: 'N/A',
            levelName: 'N/A'
        }));
    } catch (error) {
        console.error('Error fetching project movements:', error);
        return [];
    }
}