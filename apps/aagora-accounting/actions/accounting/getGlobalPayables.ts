'use server';

import { db, project, purchaseOrder, contact } from '@workspace/db';
import { eq, and, ne, inArray, desc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getGlobalPayables() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return null;

        const userProjects = await db
            .select({ id: project.id, title: project.title })
            .from(project)
            .where(and(eq(project.authorId, userId), eq(project.status, 'activo')));

        if (userProjects.length === 0) {
            return { totalPayable: 0, pendingCount: 0, overdueCount: 0, items: [] };
        }

        const projectIds = userProjects.map(p => p.id);
        const titleMap = new Map(userProjects.map(p => [p.id, p.title]));

        const orders = await db
            .select()
            .from(purchaseOrder)
            .where(and(
                inArray(purchaseOrder.projectId, projectIds),
                ne(purchaseOrder.status, 'completado'),
            ))
            .orderBy(desc(purchaseOrder.createdAt));

        const supplierIds = [...new Set(
            orders.map(o => o.supplierId).filter((id): id is string => id !== null)
        )];

        const suppliers = supplierIds.length > 0
            ? await db.select({ id: contact.id, name: contact.name, company: contact.company })
                .from(contact)
                .where(inArray(contact.id, supplierIds))
            : [];

        const supplierMap = new Map(suppliers.map(s => [s.id, s]));

        const totalPayable = orders.reduce((sum, o) => sum + o.totalAmount, 0);

        return {
            totalPayable,
            pendingCount: orders.length,
            overdueCount: orders.filter(o => o.status === 'pendiente').length,
            items: orders.map(o => {
                const supplier = o.supplierId ? supplierMap.get(o.supplierId) : null;
                return {
                    id: o.number,
                    supplier: supplier?.company || supplier?.name || 'Varios',
                    project: titleMap.get(o.projectId) ?? '—',
                    amount: o.totalAmount,
                    dueDate: o.createdAt.toISOString().split('T')[0],
                    status: o.status === 'pendiente' ? 'pending' : 'procesado',
                };
            }),
        };
    } catch (error) {
        console.error('Error fetching global payables:', error);
        return null;
    }
}
