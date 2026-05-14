'use server';

import { db, valuation, valuationItem, projectItem, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function deleteValuation(id: string) {
    if (!id) return { success: false, error: 'Valuation ID is required' };

    try {
        const userId = await getAuthUserId();
        if (!userId) throw new Error("No autorizado");

        const val = await db.query.valuation.findFirst({
            where: eq(valuation.id, id),
            with: { items: true }
        });

        if (!val) throw new Error("Valuación no encontrada");

        // Revert progress on project items
        for (const item of (val as any).items || []) {
            const [pi] = await db.select({ progress: projectItem.progress })
                .from(projectItem).where(eq(projectItem.id, item.projectItemId)).limit(1);
            if (pi) {
                await db.update(projectItem)
                    .set({ progress: Math.max(0, (pi.progress || 0) - item.quantity) })
                    .where(eq(projectItem.id, item.projectItemId));
            }
        }

        // Delete valuation items, then valuation (cascade should handle items, but explicit is safer)
        await db.delete(valuationItem).where(eq(valuationItem.valuationId, id));
        await db.delete(valuation).where(eq(valuation.id, id));

        await db.insert(siteLog).values({
            projectId: val.projectId,
            authorId: userId,
            type: 'info',
            content: `PLANILLA ELIMINADA: ${val.number} - ${val.description}. El progreso de los ítems ha sido revertido.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${val.projectId}/operations`);
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting valuation:', error);
        return { success: false, error: error.message };
    }
}