'use server';

import { db, projectItem, siteLog } from '@workspace/db';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function batchUpdateProjectItemProgress(projectId: string, updates: { itemId: string, increment: number, log: string }[]) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        for (const update of updates) {
            const [pi] = await db.select().from(projectItem).where(
                and(eq(projectItem.projectId, projectId), eq(projectItem.itemId, update.itemId))
            ).limit(1);

            if (!pi) continue;

            const newProgress = (Number(pi.progress) || 0) + Number(update.increment);

            await db.update(projectItem)
                .set({ progress: newProgress })
                .where(eq(projectItem.id, pi.id));

            await db.insert(siteLog).values({
                projectId,
                authorId: userId,
                type: 'progress',
                content: update.log,
                date: new Date()
            }).catch(e => console.warn("Fallo registro bitácora:", (e as any).message));
        }

        revalidatePath(`/projects/${projectId}`);
        revalidatePath(`/projects/${projectId}/construction`);
        return { success: true };
    } catch (error: any) {
        console.error("Batch update error:", error);
        return { success: false, error: "Fallo al actualizar el avance físico." };
    }
}