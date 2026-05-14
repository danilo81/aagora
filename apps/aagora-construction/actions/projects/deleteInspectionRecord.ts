'use server';

import { db, inspectionRecord } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function deleteInspectionRecord(id: string, projectId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        await db.delete(inspectionRecord).where(eq(inspectionRecord.id, id));
        revalidatePath(`/projects/${projectId}/operations`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting inspection record:', error);
        return { success: false, error: 'Error al eliminar el registro.' };
    }
}