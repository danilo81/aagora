'use server';

import { db, constructionItem, projectItem, siteLog } from '@workspace/db';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function addProjectItem(projectId: string, itemId: string, quantity: number = 0) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const [item] = await db.select().from(constructionItem).where(eq(constructionItem.id, itemId)).limit(1);
        if (!item) throw new Error("Item no encontrado");

        const [existing] = await db.select().from(projectItem).where(
            and(eq(projectItem.projectId, projectId), eq(projectItem.itemId, itemId))
        ).limit(1);

        let resultItem;
        if (existing) {
            const [updated] = await db.update(projectItem)
                .set({ quantity: Number(quantity) || 0 })
                .where(and(eq(projectItem.projectId, projectId), eq(projectItem.itemId, itemId)))
                .returning();
            resultItem = updated;
        } else {
            const [created] = await db.insert(projectItem)
                .values({ projectId, itemId, quantity: Number(quantity) || 0 })
                .returning();
            resultItem = created;
        }

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'info',
            content: existing
                ? `CÓMPUTO MODIFICADO: Se actualizó "${item.description}" a ${quantity} ${item.unit || ''}.`
                : `NUEVA PARTIDA: Se añadió "${item.description}" (${quantity} ${item.unit || ''}) al presupuesto.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${projectId}`);
        revalidatePath(`/projects/${projectId}/construction`);
        return { success: true, projectItem: resultItem };
    } catch (error: any) {
        return { success: false, error: "Error al añadir" };
    }
}