'use server';

import { db, purchaseOrder } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { requireProjectAccess } from '@/lib/require-project-access';

export async function getPurchaseOrders(projectId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const orders = await db.query.purchaseOrder.findMany({
            where: eq(purchaseOrder.projectId, projectId),
            with: {
                supplier: true,
                items: { with: { supply: true } }
            },
            orderBy: [desc(purchaseOrder.createdAt)]
        });
        return { success: true, orders: JSON.parse(JSON.stringify(orders)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}