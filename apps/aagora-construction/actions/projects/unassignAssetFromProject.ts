'use server';

import { db, fixedAsset } from '@workspace/db';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function unassignAssetFromProject(assetId: string, projectId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const existingAsset = await db.query.fixedAsset.findFirst({ where: eq(fixedAsset.id, assetId), columns: { userId: true } });
        if (!existingAsset || existingAsset.userId !== userId) return { success: false, error: 'No tienes permisos sobre este activo.' };

        const [asset] = await db.update(fixedAsset)
            .set({ projectId: null, status: 'disponible' })
            .where(and(eq(fixedAsset.id, assetId), eq(fixedAsset.userId, userId)))
            .returning();
        revalidatePath(`/projects/${projectId}/model`);
        return { success: true, asset };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}