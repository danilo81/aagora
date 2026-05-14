"use server";

import { db, project, purchaseOrder, purchaseOrderItem, supply, supplyRequest, projectContact, projectChangeOrder, contact, siteLog } from '@workspace/db';
import { eq, and, like, inArray, desc } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function createPurchaseOrder(data: {
    projectId: string;
    supplierId: string;
    items: { supplyId: string, quantity: number, price: number }[];
    paymentType?: string;
    dueDate?: string;
    notes?: string;
    requestIds?: string[];
}) {
    try {
        const { projectId, supplierId, items, paymentType, dueDate, notes, requestIds } = data;

        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        if (requestIds && requestIds.length > 0) {
            await db.update(supplyRequest)
                .set({ status: 'completado' })
                .where(inArray(supplyRequest.id, requestIds));
        }

        const [proj] = await db.select({ title: project.title }).from(project).where(eq(project.id, projectId)).limit(1);
        const projectPrefix = proj?.title?.slice(0, 3).toUpperCase() || 'ORD';

        const [lastOrder] = await db.select({ number: purchaseOrder.number })
            .from(purchaseOrder)
            .where(like(purchaseOrder.number, `${projectPrefix}-%`))
            .orderBy(desc(purchaseOrder.number))
            .limit(1);

        let nextNumber = 1;
        if (lastOrder) {
            const lastNumStr = lastOrder.number.split('-').pop();
            const lastNum = parseInt(lastNumStr || '0');
            if (!isNaN(lastNum)) nextNumber = lastNum + 1;
        }

        const poNumber = `${projectPrefix}-${nextNumber.toString().padStart(4, '0')}`;
        const totalAmount = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

        const [newOrder] = await db.insert(purchaseOrder).values({
            number: poNumber,
            projectId,
            supplierId: supplierId === 'none' ? null : supplierId,
            authorId: userId,
            paymentType: paymentType || 'contado',
            dueDate: dueDate ? new Date(dueDate) : null,
            notes,
            totalAmount,
        }).returning();

        if (items.length > 0) {
            await db.insert(purchaseOrderItem).values(
                items.map(item => ({
                    purchaseOrderId: newOrder.id,
                    supplyId: item.supplyId,
                    quantity: item.quantity,
                    price: item.price,
                }))
            );
        }

        // Check for overcost
        const supplyIds = items.map(i => i.supplyId);
        const baseSupplies = supplyIds.length > 0
            ? await db.select().from(supply).where(inArray(supply.id, supplyIds))
            : [];

        let totalOvercost = 0;
        for (const item of items) {
            const baseSupply = baseSupplies.find(s => s.id === item.supplyId);
            if (baseSupply && item.price > baseSupply.price) {
                totalOvercost += (item.price - baseSupply.price) * item.quantity;
            }
        }

        if (totalOvercost > 0) {
            const [lastOCP] = await db.select({ number: projectChangeOrder.number })
                .from(projectChangeOrder)
                .where(like(projectChangeOrder.number, 'OC-P-%'))
                .orderBy(desc(projectChangeOrder.number))
                .limit(1);

            let nextOCNum = 1;
            if (lastOCP?.number) {
                const lastNum = parseInt(lastOCP.number.split('-').pop() || '0');
                if (!isNaN(lastNum)) nextOCNum = lastNum + 1;
            }

            await db.insert(projectChangeOrder).values({
                projectId,
                number: `OC-P-${nextOCNum.toString().padStart(3, '0')}`,
                description: `Sobrecosto en Orden de Compra ${poNumber}`,
                amount: totalOvercost,
                type: "Incremento de Precio",
                status: "pendiente",
                reason: "Sobreprecio en Compra"
            });
        }

        if (supplierId && supplierId !== 'none') {
            const [existingLink] = await db.select().from(projectContact).where(
                and(eq(projectContact.projectId, projectId), eq(projectContact.contactId, supplierId))
            ).limit(1);

            if (!existingLink) {
                await db.insert(projectContact).values({ projectId, contactId: supplierId, permissions: {} });
            }
        }

        const [supplier] = supplierId && supplierId !== 'none'
            ? await db.select({ name: contact.name }).from(contact).where(eq(contact.id, supplierId)).limit(1)
            : [null];

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'info',
            content: `ORDEN DE COMPRA: Generada N° ${newOrder.number} para ${(supplier as any)?.name || "Sin proveedor asignado"} por ${newOrder.totalAmount.toLocaleString('es-ES')} BOB.${totalOvercost > 0 ? ' Se detectó UN SOBRECOSTO y se generó una Orden de Cambio pendiente.' : ''}`,
            date: new Date()
        });

        revalidatePath(`/projects/${projectId}/operations`);
        revalidatePath(`/projects/${projectId}/shop`);
        return { success: true, order: newOrder };
    } catch (error: any) {
        console.error('Error creating purchase order:', error);
        return { success: false, error: error.message };
    }
}