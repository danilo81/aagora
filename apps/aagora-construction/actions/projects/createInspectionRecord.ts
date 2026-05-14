'use server';

import { db, projectItem, inspectionRecord, inspectionCheck, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export interface InspectionCheckInput {
    qualityControlId: string;
    subPointId?: string;
    passed: boolean;
    observation?: string;
}

export interface CreateInspectionRecordData {
    projectId: string;
    projectItemId: string;
    levelId?: string;
    inspector?: string;
    date?: string;
    notes?: string;
    checks: InspectionCheckInput[];
    imageUrls?: string[];
}

export async function createInspectionRecord(data: CreateInspectionRecordData) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        // Get projectItem with item info
        const pi = await db.query.projectItem.findFirst({
            where: eq(projectItem.id, data.projectItemId),
            with: { item: true }
        });

        const status = 'pendiente';

        const [newRecord] = await db.insert(inspectionRecord).values({
            projectId: data.projectId,
            projectItemId: data.projectItemId,
            levelId: data.levelId || null,
            inspector: data.inspector || null,
            date: data.date ? new Date(data.date) : new Date(),
            notes: data.notes || null,
            status: status,
            imageUrls: data.imageUrls || [],
        }).returning();

        if (data.checks.length > 0) {
            await db.insert(inspectionCheck).values(
                data.checks.map(c => ({
                    inspectionRecordId: newRecord.id,
                    qualityControlId: c.qualityControlId,
                    subPointId: c.subPointId || null,
                    passed: c.passed,
                    observation: c.observation || null,
                }))
            );
        }

        await db.insert(siteLog).values({
            projectId: data.projectId,
            authorId: userId,
            type: 'info',
            content: `INSPECCIÓN DE CALIDAD: "${(pi as any)?.item?.description || 'Partida'}" creada, en espera de aprobación.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${data.projectId}/operations`);
        return { success: true, record: newRecord };
    } catch (error: any) {
        console.error('Error creating inspection record:', error);
        return { success: false, error: 'Error al registrar la inspección.' };
    }
}