'use server';

import { db, constructionItem, constructionItemSupply, projectItem, projectItemLevelQuantity, siteLog } from '@workspace/db';
import { customizeProjectItemSchema, type CustomizeProjectItemInput } from '@workspace/db/validation';
import { eq, and } from 'drizzle-orm';
import { requireProjectAccess } from '@/lib/require-project-access';

export async function customizeProjectItem(projectId: string, oldItemId: string, input: CustomizeProjectItemInput) {
    const parsed = customizeProjectItemSchema.safeParse(input);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const oldProjectItem = await db.query.projectItem.findFirst({
            where: and(eq(projectItem.projectId, projectId), eq(projectItem.itemId, oldItemId)),
            with: { levelQuantities: true }
        });
        if (!oldProjectItem) throw new Error("Vínculo de proyecto no encontrado");

        const [customizedItem] = await db.insert(constructionItem).values({
            chapter: parsed.data.chapter,
            description: `${parsed.data.description} (Local)`,
            unit: parsed.data.unit,
            performance: Number(parsed.data.performance) || 1,
            directCost: Number(parsed.data.directCost) || 0,
            total: Number(parsed.data.total) || 0,
            userId: userId,
        }).returning();

        if (parsed.data.supplies?.length) {
            await db.insert(constructionItemSupply).values(
                parsed.data.supplies.map(s => ({
                    itemId: customizedItem.id,
                    supplyId: s.supplyId ?? s.id,
                    quantity: Number(s.quantity) || 0
                }))
            );
        }

        const [newPi] = await db.insert(projectItem).values({
            projectId,
            itemId: customizedItem.id,
            quantity: oldProjectItem.quantity,
        }).returning();

        if (oldProjectItem.levelQuantities?.length) {
            await db.insert(projectItemLevelQuantity).values(
                oldProjectItem.levelQuantities.map(lq => ({
                    projectItemId: newPi.id,
                    levelId: lq.levelId,
                    quantity: lq.quantity
                }))
            );
        }

        await db.delete(projectItem).where(and(eq(projectItem.projectId, projectId), eq(projectItem.itemId, oldItemId)));

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'info',
            content: `APU PERSONALIZADO: Se creó un análisis de costos local para "${parsed.data.description}".`,
            date: new Date()
        }).catch(() => null);

        return { success: true, newItemId: customizedItem.id };
    } catch (error: any) { return { success: false, error: error.message }; }
}
