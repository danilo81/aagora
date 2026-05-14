'use server';

import { db, warehouseMovement } from '@workspace/db';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";
import { WarehouseMovement } from "@/types/types";

export async function createWarehouseMovement(data: Omit<WarehouseMovement, 'id' | 'createdAt' | 'authorId'>, projectId: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const [movement] = await db.insert(warehouseMovement).values({
            ...data,
            projectId,
            authorId: userId
        }).returning();
        revalidatePath(`/projects/${projectId}/warehouse`);
        return { success: true, movement };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}