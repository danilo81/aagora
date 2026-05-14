'use server';

import { db, siteLog } from '@workspace/db';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function createSiteLogEntry(projectId: string, type: string, content: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };
        const [log] = await db.insert(siteLog).values({ projectId, authorId: userId, type, content, date: new Date() }).returning();
        revalidatePath(`/projects/${projectId}`);
        return { success: true, log };
    } catch (error: any) { return { success: false, error: error.message }; }
}