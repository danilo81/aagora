'use server';

import { db, warehouseMovement, project, supply } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getGlobalWarehouseMovements() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        const movements = await db.select({
            id: warehouseMovement.id,
            createdAt: warehouseMovement.createdAt,
            type: warehouseMovement.type,
            projectTitle: project.title,
            supplyDescription: supply.description,
        })
        .from(warehouseMovement)
        .leftJoin(project, eq(warehouseMovement.projectId, project.id))
        .leftJoin(supply, eq(warehouseMovement.supplyId, supply.id))
        .where(eq(project.authorId, userId))
        .orderBy(desc(warehouseMovement.createdAt))
        .limit(8);

        return movements.map(m => ({
            id: m.id,
            date: m.createdAt.toISOString(),
            type: m.type === 'entry' ? 'ingreso' : 'salida',
            projectName: m.projectTitle || '',
            itemCount: 1,
            description: m.supplyDescription ?? 'Material'
        }));
    } catch (error) { return []; }
}