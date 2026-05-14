'use server';

import { db, bimVersion, bimBranch, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function createBimVersion(projectId: string, branchId: string, message: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const hash = Math.random().toString(36).substring(2, 10).toUpperCase();

        const [version] = await db.insert(bimVersion).values({
            branchId,
            authorId: userId,
            authorName: userId,
            message,
            hash
        }).returning();

        const [branch] = await db.select({ name: bimBranch.name }).from(bimBranch).where(eq(bimBranch.id, branchId)).limit(1);

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'info',
            content: `NUEVA VERSIÓN BIM: Branch [${branch?.name ?? branchId}] - Commit: ${hash} - ${message}`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${projectId}/model`);
        return { success: true, version: JSON.parse(JSON.stringify(version)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}