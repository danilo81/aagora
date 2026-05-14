"use server";

import { db } from "@workspace/db";
import { purchaseOrder, project, contact } from "@workspace/db/schema";
import { eq, desc, inArray } from "drizzle-orm";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function getGlobalPurchaseOrders() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        const userProjects = await db.select({ id: project.id }).from(project).where(eq(project.authorId, userId));
        if (userProjects.length === 0) return [];

        const projectIds = userProjects.map(p => p.id);

        const results = await db.select({
            id: purchaseOrder.number,
            supplier: contact.name,
            amount: purchaseOrder.totalAmount,
            status: purchaseOrder.status,
            label: purchaseOrder.paymentType,
            project: project.title,
        })
        .from(purchaseOrder)
        .leftJoin(project, eq(purchaseOrder.projectId, project.id))
        .leftJoin(contact, eq(purchaseOrder.supplierId, contact.id))
        .where(inArray(purchaseOrder.projectId, projectIds))
        .orderBy(desc(purchaseOrder.createdAt))
        .limit(20);
        
        return results;
    } catch (error) {
        console.error("Error fetching global purchase orders:", error);
        return [];
    }
}
