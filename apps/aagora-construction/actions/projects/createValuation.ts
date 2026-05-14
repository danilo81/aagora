'use server';

import { db, valuation, valuationItem, projectItem, siteLog } from '@workspace/db';
import { eq, sql } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

interface ValuationItemInput {
    projectItemId: string;
    quantity: number;
    price: number;
    amount: number;
}

interface CreateValuationData {
    projectId: string;
    description: string;
    date: Date | string;
    items: ValuationItemInput[];
    retentionAmount: number;
    retentionPercentage: number;
    netAmount: number;
    updateProgress?: boolean;
}

export async function createValuation(data: CreateValuationData) {
    const {
        projectId,
        description,
        date,
        items,
        retentionAmount,
        retentionPercentage,
        netAmount,
        updateProgress = false
    } = data;

    if (!projectId || items.length === 0) {
        return { success: false, error: 'Missing required valuation data' };
    }

    try {
        const userId = await getAuthUserId();
        if (!userId) throw new Error("No autorizado");

        const countResult = await db.select({ count: sql<number>`count(*)` })
            .from(valuation).where(eq(valuation.projectId, projectId));
        const count = Number(countResult[0]?.count || 0);
        const valuationNumber = `VAL-${String(count + 1).padStart(3, '0')}`;
        const totalAmount = items.reduce((acc, item) => acc + item.amount, 0);

        const [newValuation] = await db.insert(valuation).values({
            projectId,
            number: valuationNumber,
            description,
            date: new Date(date),
            totalAmount,
            retentionAmount,
            retentionPercentage,
            netAmount,
            status: 'completado',
        }).returning();

        await db.insert(valuationItem).values(
            items.map(item => ({
                valuationId: newValuation.id,
                projectItemId: item.projectItemId,
                quantity: item.quantity,
                price: item.price,
                amount: item.amount,
            }))
        );

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'info',
            content: `PLANILLA DE AVANCE: Generada ${valuationNumber} - ${description}. Total: ${totalAmount.toLocaleString('es-ES')} BOB.`,
            date: new Date()
        }).catch(() => null);

        if (updateProgress) {
            for (const item of items) {
                const [pi] = await db.select({ progress: projectItem.progress })
                    .from(projectItem).where(eq(projectItem.id, item.projectItemId)).limit(1);
                if (pi) {
                    await db.update(projectItem)
                        .set({ progress: (pi.progress || 0) + item.quantity })
                        .where(eq(projectItem.id, item.projectItemId));
                }
            }
        }

        revalidatePath(`/projects/${projectId}/operations`);
        return { success: true, valuation: newValuation };
    } catch (error: any) {
        console.error('Error creating valuation:', error);
        return { success: false, error: error.message };
    }
}