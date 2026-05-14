'use server';

import { db, warehouseMovement } from '@workspace/db';
import { eq } from 'drizzle-orm';

export async function getWarehouseStock(projectId: string) {
    try {
        const movements = await db.select({
            supplyId: warehouseMovement.supplyId,
            type: warehouseMovement.type,
            quantity: warehouseMovement.quantity,
        }).from(warehouseMovement).where(eq(warehouseMovement.projectId, projectId));

        const stockMap: Record<string, { totalIn: number; totalOut: number; currentStock: number }> = {};
        for (const m of movements) {
            if (!stockMap[m.supplyId]) {
                stockMap[m.supplyId] = { totalIn: 0, totalOut: 0, currentStock: 0 };
            }
            if (m.type === 'entry') {
                stockMap[m.supplyId].totalIn += m.quantity;
            } else {
                stockMap[m.supplyId].totalOut += m.quantity;
            }
            stockMap[m.supplyId].currentStock = stockMap[m.supplyId].totalIn - stockMap[m.supplyId].totalOut;
        }

        return stockMap;
    } catch (error) {
        console.error('Error fetching warehouse stock:', error);
        return {};
    }
}