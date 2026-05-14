'use server';

import { db, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function deleteSiteLogEntry(logId: string, projectId: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const [existingLog] = await db.select().from(siteLog).where(eq(siteLog.id, logId)).limit(1);
        if (!existingLog) return { success: false, error: "Registro no encontrado" };

        await db.delete(siteLog).where(eq(siteLog.id, logId));

        revalidatePath(`/projects/${projectId}`);
        revalidatePath(`/projects/${projectId}/operations`);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}