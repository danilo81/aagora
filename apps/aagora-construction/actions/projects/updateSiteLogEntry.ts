'use server';

import { db, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function updateSiteLogEntry(logId: string, projectId: string, type: string, content: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const [existingLog] = await db.select().from(siteLog).where(eq(siteLog.id, logId)).limit(1);
        if (!existingLog) return { success: false, error: "Registro no encontrado" };

        const [log] = await db.update(siteLog)
            .set({ type, content })
            .where(eq(siteLog.id, logId))
            .returning();

        revalidatePath(`/projects/${projectId}`);
        revalidatePath(`/projects/${projectId}/operations`);
        return { success: true, log };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}