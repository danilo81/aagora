'use server';

import { db, projectItem, siteLog } from '@workspace/db';
import { eq, and } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function removeProjectItem(projectId: string, itemId: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const pi = await db.query.projectItem.findFirst({
            where: and(eq(projectItem.projectId, projectId), eq(projectItem.itemId, itemId)),
            with: { item: true }
        });

        if (!pi) throw new Error("Partida no encontrada");

        await db.delete(projectItem).where(eq(projectItem.id, pi.id));

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'info',
            content: `PARTIDA ELIMINADA: Se quitó "${(pi as any).item.description}" del presupuesto del proyecto.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${projectId}`);
        revalidatePath(`/projects/${projectId}/construction`);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: "Error al eliminar" };
    }
}