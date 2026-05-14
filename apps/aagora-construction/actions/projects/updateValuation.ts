'use server';

import { db, valuation, valuationItem, projectItem, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

interface ValuationItemInput {
    id?: string;
    projectItemId: string;
    quantity: number;
    price: number;
    amount: number;
}

interface UpdateValuationData {
    description?: string;
    date?: Date | string;
    items: ValuationItemInput[];
    retentionAmount: number;
    retentionPercentage: number;
    netAmount: number;
}

export async function updateValuation(id: string, data: UpdateValuationData) {
    const { description, date, items, retentionAmount, retentionPercentage, netAmount } = data;

    if (!id || items.length === 0) {
        return { success: false, error: 'Missing required valuation data' };
    }

    try {
        const userId = await getAuthUserId();
        if (!userId) throw new Error("No autorizado");

        const oldValuation = await db.query.valuation.findFirst({
            where: eq(valuation.id, id),
            with: { items: true }
        });

        if (!oldValuation) throw new Error("Valuación no encontrada");

        // Revert old progress
        for (const oldItem of (oldValuation as any).items || []) {
            const [pi] = await db.select({ progress: projectItem.progress })
                .from(projectItem).where(eq(projectItem.id, oldItem.projectItemId)).limit(1);
            if (pi) {
                await db.update(projectItem)
                    .set({ progress: Math.max(0, (pi.progress || 0) - oldItem.quantity) })
                    .where(eq(projectItem.id, oldItem.projectItemId));
            }
        }

        await db.delete(valuationItem).where(eq(valuationItem.valuationId, id));

        await db.update(valuation)
            .set({
                description,
                date: date ? new Date(date) : undefined,
                totalAmount: items.reduce((acc, item) => acc + item.amount, 0),
                retentionAmount,
                retentionPercentage,
                netAmount,
                updatedAt: new Date(),
            })
            .where(eq(valuation.id, id));

        if (items.length > 0) {
            await db.insert(valuationItem).values(
                items.map(item => ({
                    valuationId: id,
                    projectItemId: item.projectItemId,
                    quantity: item.quantity,
                    price: item.price,
                    amount: item.amount,
                }))
            );
        }

        // Apply new progress
        for (const newItem of items) {
            const [pi] = await db.select({ progress: projectItem.progress })
                .from(projectItem).where(eq(projectItem.id, newItem.projectItemId)).limit(1);
            if (pi) {
                await db.update(projectItem)
                    .set({ progress: (pi.progress || 0) + newItem.quantity })
                    .where(eq(projectItem.id, newItem.projectItemId));
            }
        }

        await db.insert(siteLog).values({
            projectId: oldValuation.projectId,
            authorId: userId,
            type: 'info',
            content: `PLANILLA ACTUALIZADA: ${oldValuation.number} - ${description}. Se ha recalculado el progreso de los ítems.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${oldValuation.projectId}/operations`);
        return { success: true };
    } catch (error: any) {
        console.error('Error updating valuation:', error);
        return { success: false, error: error.message };
    }
}