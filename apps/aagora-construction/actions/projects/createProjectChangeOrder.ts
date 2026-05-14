"use server";

import { db, project, projectConfig, projectItem, projectItemLevelQuantity, projectChangeOrder, siteLog } from '@workspace/db';
import { eq, and, like } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";
import { calculateAPU } from "../../lib/apu-utils";

export async function createProjectChangeOrder(projectId: string, reason: string, computations: any[]) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const projectWithConfig = await db.query.project.findFirst({
            where: eq(project.id, projectId),
            with: { config: true }
        });
        const configArr = (projectWithConfig as any)?.config;
        const config = Array.isArray(configArr) ? configArr[0] : configArr;

        let totalFinancialImpact = 0;

        const currentItems = await db.query.projectItem.findMany({
            where: eq(projectItem.projectId, projectId),
            with: { item: { with: { supplies: { with: { supply: true } } } } }
        });

        for (const row of computations) {
            const currentItem = currentItems.find((ci: any) => ci.itemId === row.id);
            const oldQuantity = currentItem?.quantity || 0;
            const newQuantity = Number(row.total) || 0;
            const deltaQuantity = newQuantity - oldQuantity;

            if (deltaQuantity !== 0) {
                const apu = calculateAPU((currentItem as any)?.item?.supplies || [], config);
                const unitPrice = apu.totalUnit || 0;
                totalFinancialImpact += deltaQuantity * unitPrice;
            }

            let piRecord;
            if (currentItem) {
                const [updated] = await db.update(projectItem)
                    .set({ quantity: newQuantity })
                    .where(and(eq(projectItem.projectId, projectId), eq(projectItem.itemId, row.id)))
                    .returning();
                piRecord = updated;
            } else {
                const [created] = await db.insert(projectItem)
                    .values({ projectId, itemId: row.id, quantity: newQuantity })
                    .returning();
                piRecord = created;
            }

            if (row.values && row.levelIds) {
                for (let i = 0; i < row.values.length; i++) {
                    const [existingLQ] = await db.select().from(projectItemLevelQuantity).where(
                        and(eq(projectItemLevelQuantity.projectItemId, piRecord.id), eq(projectItemLevelQuantity.levelId, row.levelIds[i]))
                    ).limit(1);
                    if (existingLQ) {
                        await db.update(projectItemLevelQuantity)
                            .set({ quantity: Number(row.values[i]) || 0 })
                            .where(and(eq(projectItemLevelQuantity.projectItemId, piRecord.id), eq(projectItemLevelQuantity.levelId, row.levelIds[i])));
                    } else {
                        await db.insert(projectItemLevelQuantity).values({
                            projectItemId: piRecord.id,
                            levelId: row.levelIds[i],
                            quantity: Number(row.values[i]) || 0
                        });
                    }
                }
            }
        }

        const allOrders = await db.select({ number: projectChangeOrder.number })
            .from(projectChangeOrder)
            .where(like(projectChangeOrder.number, 'OC-%'));

        let nextNumber = 1;
        if (allOrders.length > 0) {
            const numbers = allOrders
                .map(o => {
                    const parts = o.number!.split('-');
                    return parts[1] ? parseInt(parts[1], 10) : 0;
                })
                .filter(n => !isNaN(n));
            if (numbers.length > 0) {
                nextNumber = Math.max(...numbers) + 1;
            }
        }
        const orderNumber = `OC-${nextNumber.toString().padStart(3, '0')}`;

        await db.insert(projectChangeOrder).values({
            projectId,
            number: orderNumber,
            description: reason,
            amount: totalFinancialImpact,
            type: totalFinancialImpact >= 0 ? "Adición" : "Deducción",
            status: "pendiente",
            reason: "Cambio de Cómputo"
        });

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'info',
            content: `ORDEN DE CAMBIO CREADA: ${orderNumber} — ${reason}. Impacto: $${totalFinancialImpact.toFixed(2)}. En espera de aprobación.`,
            date: new Date()
        });

        revalidatePath(`/projects/${projectId}`);
        revalidatePath(`/projects/${projectId}/construction`);
        revalidatePath(`/projects/${projectId}/operations`);

        return { success: true };
    } catch (error: any) {
        console.error("Change Order Error:", error);
        return { success: false, error: "Error al procesar la orden de cambio en base de datos." };
    }
}