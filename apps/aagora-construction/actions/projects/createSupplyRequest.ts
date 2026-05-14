'use server';

import { db, supply, supplyRequest, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export interface CreateSupplyRequestData {
    projectId: string;
    supplyId: string;
    quantity: number;
}

export async function createSupplyRequest(data: CreateSupplyRequestData) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const [supplyDetails] = await db.select({ description: supply.description, unit: supply.unit })
            .from(supply).where(eq(supply.id, data.supplyId)).limit(1);

        const [request] = await db.insert(supplyRequest).values({
            projectId: data.projectId,
            supplyId: data.supplyId,
            quantity: data.quantity,
            status: 'pendiente'
        }).returning();

        await db.insert(siteLog).values({
            projectId: data.projectId,
            authorId: userId,
            type: 'info',
            content: `PEDIDO DE OBRA: Se ha solicitado ${data.quantity} ${supplyDetails?.unit || ''} de "${supplyDetails?.description || 'Insumo'}".`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${data.projectId}/operations`);
        revalidatePath(`/projects/${data.projectId}/shop`);
        return { success: true, request };
    } catch (error: any) {
        console.error('Error creating supply request:', error);
        return { success: false, error: 'Error al procesar el pedido.' };
    }
}