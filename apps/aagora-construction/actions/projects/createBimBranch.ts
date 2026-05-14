'use server';

import { db, bimBranch } from '@workspace/db';
import { revalidatePath } from "next/cache";

export async function createBimBranch(projectId: string, name: string) {
    try {
        const [branch] = await db.insert(bimBranch).values({
            projectId,
            name: name.toLowerCase().replace(/\s+/g, '-'),
            isMain: false
        }).returning();
        revalidatePath(`/projects/${projectId}/model`);
        return { success: true, branch: JSON.parse(JSON.stringify(branch)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}