'use server';

import { db, projectItem, constructionItem, projectItemLevelQuantity, siteLog } from '@workspace/db';
import { eq, and } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function updateProjectItem(
    projectId: string,
    itemId: string,
    data: {
        quantity?: number,
        performance?: number,
        extraDays?: number,
        ganttStatus?: string,
        startDate?: Date | null,
        predecessorId?: string | null,
        levelQuantities?: { levelId: string, quantity: number }[]
    }
) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const updateData: any = {};
        if (data.quantity !== undefined) updateData.quantity = Number(data.quantity);
        if (data.performance !== undefined) updateData.performance = Number(data.performance);
        if (data.extraDays !== undefined) updateData.extraDays = Number(data.extraDays);
        if (data.ganttStatus !== undefined) updateData.ganttStatus = data.ganttStatus;
        if (data.startDate !== undefined) updateData.startDate = data.startDate;

        if (data.predecessorId !== undefined) {
            if (data.predecessorId === "" || data.predecessorId === null) {
                updateData.predecessorId = null;
            } else {
                const [predItem] = await db.select({ id: projectItem.id })
                    .from(projectItem)
                    .where(and(eq(projectItem.projectId, projectId), eq(projectItem.itemId, data.predecessorId)))
                    .limit(1);
                if (predItem) updateData.predecessorId = predItem.id;
            }
        }

        const pi = await db.query.projectItem.findFirst({
            where: and(eq(projectItem.projectId, projectId), eq(projectItem.itemId, itemId)),
            with: { item: true }
        });
        if (!pi) throw new Error("Partida no encontrada");

        await db.update(projectItem)
            .set(updateData)
            .where(and(eq(projectItem.projectId, projectId), eq(projectItem.itemId, itemId)));

        const itemDescription = (pi as any).item?.description || '';
        const itemUnit = (pi as any).item?.unit || '';

        if (data.quantity !== undefined) {
            await db.insert(siteLog).values({
                projectId,
                authorId: userId,
                type: 'info',
                content: `CÓMPUTO ACTUALIZADO: "${itemDescription}" ahora es ${data.quantity} ${itemUnit}.`,
                date: new Date()
            });
        }

        const isScheduleMod = data.performance !== undefined || data.extraDays !== undefined ||
            data.ganttStatus !== undefined || data.startDate !== undefined || data.predecessorId !== undefined;

        if (isScheduleMod) {
            await db.insert(siteLog).values({
                projectId,
                authorId: userId,
                type: 'info',
                content: `CRONOGRAMA MODIFICADO: Ajuste de fechas/rendimiento en "${itemDescription}".`,
                date: new Date()
            });
        }

        if (data.levelQuantities && data.levelQuantities.length > 0) {
            for (const lq of data.levelQuantities) {
                const [existingLQ] = await db.select().from(projectItemLevelQuantity).where(
                    and(eq(projectItemLevelQuantity.projectItemId, pi.id), eq(projectItemLevelQuantity.levelId, lq.levelId))
                ).limit(1);
                if (existingLQ) {
                    await db.update(projectItemLevelQuantity)
                        .set({ quantity: Number(lq.quantity) || 0 })
                        .where(and(eq(projectItemLevelQuantity.projectItemId, pi.id), eq(projectItemLevelQuantity.levelId, lq.levelId)));
                } else {
                    await db.insert(projectItemLevelQuantity).values({
                        projectItemId: pi.id,
                        levelId: lq.levelId,
                        quantity: Number(lq.quantity) || 0
                    });
                }
            }
        }

        revalidatePath(`/projects/${projectId}`);
        revalidatePath(`/projects/${projectId}/construction`);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: "Error al actualizar partida" };
    }
}