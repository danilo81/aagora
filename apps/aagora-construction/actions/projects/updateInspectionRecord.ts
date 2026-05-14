"use server";

import { db, inspectionRecord, inspectionCheck, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function updateInspectionRecord(
    inspectionId: string,
    projectId: string,
    checks: { qualityControlId: string, passed: boolean, observation: string }[],
    notes?: string,
    status?: string,
    imageUrls?: string[]
) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const resolvedStatus = status ?? 'pendiente';

        const inspection = await db.query.inspectionRecord.findFirst({
            where: eq(inspectionRecord.id, inspectionId),
            with: { projectItem: { with: { item: true } } }
        });

        await db.delete(inspectionCheck).where(eq(inspectionCheck.inspectionRecordId, inspectionId));

        const updatePayload: any = { status: resolvedStatus, notes };
        if (imageUrls !== undefined) updatePayload.imageUrls = imageUrls;

        await db.update(inspectionRecord)
            .set(updatePayload)
            .where(eq(inspectionRecord.id, inspectionId));

        if (checks.length > 0) {
            await db.insert(inspectionCheck).values(
                checks.map(c => ({
                    inspectionRecordId: inspectionId,
                    passed: c.passed,
                    observation: c.observation,
                    qualityControlId: c.qualityControlId
                }))
            );
        }

        await db.insert(siteLog).values({
            projectId: projectId,
            authorId: userId,
            type: 'info',
            content: `INSPECCIÓN ACTUALIZADA: "${(inspection as any)?.projectItem?.item?.description || 'Partida'}" marcada como ${resolvedStatus.toUpperCase()}.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${projectId}/operations`);
        return { success: true };
    } catch (error: any) {
        console.error("Error updating inspection record:", error);
        return { success: false, error: "Failed to update inspection record" };
    }
}