'use server';

import { db, purchaseOrder, project, contact } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getGlobalPurchaseOrders() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        const orders = await db.select({
            number: purchaseOrder.number,
            totalAmount: purchaseOrder.totalAmount,
            status: purchaseOrder.status,
            createdAt: purchaseOrder.createdAt,
            projectTitle: project.title,
            supplierCompany: contact.company,
            supplierName: contact.name,
        })
        .from(purchaseOrder)
        .leftJoin(project, eq(purchaseOrder.projectId, project.id))
        .leftJoin(contact, eq(purchaseOrder.supplierId, contact.id))
        .where(eq(project.authorId, userId))
        .orderBy(desc(purchaseOrder.createdAt))
        .limit(5);

        return orders.map(o => ({
            id: o.number,
            supplier: o.supplierCompany || o.supplierName || 'Proveedor',
            project: o.projectTitle || '',
            amount: o.totalAmount,
            status: o.status === 'pendiente' ? 'pending' : o.status === 'procesado' ? 'processed' : 'completed',
            label: o.status.toUpperCase(),
            date: o.createdAt.toISOString()
        }));
    } catch (error) { return []; }
}