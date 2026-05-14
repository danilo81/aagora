'use server';

import { db, fixedAsset } from '@workspace/db';
import { eq, asc } from 'drizzle-orm';
import { requireProjectAccess } from '@/lib/require-project-access';

export async function getProjectAssets(projectId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const assets = await db.select().from(fixedAsset)
            .where(eq(fixedAsset.projectId, projectId))
            .orderBy(asc(fixedAsset.name));
        const formattedAssets = assets.map(a => ({
            ...a,
            purchaseDate: a.purchaseDate.toISOString().split('T')[0],
            status: a.status as any,
            userId: a.userId || '',
            projectId: a.projectId || null
        }));
        return { success: true, assets: formattedAssets };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}