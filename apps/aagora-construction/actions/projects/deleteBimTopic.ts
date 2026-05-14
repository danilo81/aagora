'use server';

import { db, bimTopic } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function deleteBimTopic(id: string, projectId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        await db.delete(bimTopic).where(eq(bimTopic.id, id));
        revalidatePath(`/projects/${projectId}/documentation`);
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting BIM topic:', error);
        return { success: false, error: 'Error al eliminar el tópico de la base de datos.' };
    }
}