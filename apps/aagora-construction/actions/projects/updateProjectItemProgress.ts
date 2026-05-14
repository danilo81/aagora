'use server';

import { db, projectItem, siteLog } from '@workspace/db';
import { eq, and } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function updateProjectItemProgress(projectId: string, itemId: string, progressIncrement: number, logDescription?: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const pi = await db.query.projectItem.findFirst({
            where: and(eq(projectItem.projectId, projectId), eq(projectItem.itemId, itemId)),
            with: { item: true }
        });
        if (!pi) throw new Error("Partida no encontrada");

        const newProgress = (Number(pi.progress) || 0) + Number(progressIncrement);
        await db.update(projectItem).set({ progress: newProgress }).where(eq(projectItem.id, pi.id));

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'progress',
            content: logDescription || `AVANCE: +${progressIncrement} en "${(pi as any).item?.description || ''}".`,
            date: new Date()
        });

        revalidatePath(`/projects/${projectId}`);
        return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
}