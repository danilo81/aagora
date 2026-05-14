"use server";

import { db } from "@workspace/db";
import { contact, bankAccount, projectContact, project, purchaseOrder } from "@workspace/db/schema";
import { eq, and, sum, ne } from "drizzle-orm";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function getContactAccountingInfo(contactId: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return null;

        const [contactData, bankAccounts, projectMemberships, paidOrders, pendingOrders, recentOrders] = await Promise.all([
            db.query.contact.findFirst({ where: and(eq(contact.id, contactId), eq(contact.userId, userId)) }),
            db.select().from(bankAccount).where(eq(bankAccount.contactId, contactId)),
            db.select({ project }).from(projectContact)
                .leftJoin(project, eq(projectContact.projectId, project.id))
                .where(eq(projectContact.contactId, contactId)),
            db.select({ total: sum(purchaseOrder.totalAmount) }).from(purchaseOrder)
                .where(and(eq(purchaseOrder.supplierId, contactId), eq(purchaseOrder.status, "pagado"))),
            db.select({ total: sum(purchaseOrder.totalAmount) }).from(purchaseOrder)
                .where(and(eq(purchaseOrder.supplierId, contactId), ne(purchaseOrder.status, "pagado"))),
            db.select({
                id: purchaseOrder.id,
                date: purchaseOrder.createdAt,
                amount: purchaseOrder.totalAmount,
                status: purchaseOrder.status,
                notes: purchaseOrder.notes,
                number: purchaseOrder.number,
                projectId: purchaseOrder.projectId,
            }).from(purchaseOrder)
                .where(eq(purchaseOrder.supplierId, contactId))
                .orderBy(purchaseOrder.createdAt)
                .limit(20),
        ]);

        if (!contactData) return null;

        const projectMap = new Map(
            projectMemberships.map((m) => [m.project?.id, m.project?.title])
        );

        return {
            ...contactData,
            bankAccounts,
            projects: projectMemberships.map((m) => m.project).filter(Boolean),
            totalIn: Number(paidOrders[0]?.total ?? 0),
            totalOut: Number(pendingOrders[0]?.total ?? 0),
            recentMovements: recentOrders.map((o) => ({
                date: o.date ? new Date(o.date).toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" }) : "—",
                type: o.status === "pagado" ? "ingreso" : "egreso",
                desc: o.notes ?? `OC #${o.number}`,
                project: projectMap.get(o.projectId) ?? "—",
                status: o.status === "pagado" ? "PAGO" : "PENDIENTE",
                amount: Number(o.amount ?? 0),
            })),
        };
    } catch (error) {
        console.error("Error fetching contact accounting info:", error);
        return null;
    }
}
