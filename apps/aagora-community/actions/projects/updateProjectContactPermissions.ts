'use server';

import { db, project, projectContact } from '@workspace/db';
import { permissionsSchema, type PermissionsInput } from '@workspace/db/validation';
import { eq, and } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function updateProjectContactPermissions(projectId: string, contactId: string, permissions: PermissionsInput) {
    const parsed = permissionsSchema.safeParse(permissions);
    if (!parsed.success) return { success: false, error: 'Permisos con formato inválido' };

    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const [proj] = await db.select({ authorId: project.authorId })
            .from(project).where(eq(project.id, projectId)).limit(1);
        if (proj?.authorId !== userId) {
            return { success: false, error: "Sólo el autor puede modificar los permisos" };
        }

        await db.update(projectContact)
            .set({ permissions: parsed.data })
            .where(and(eq(projectContact.projectId, projectId), eq(projectContact.contactId, contactId)));

        revalidatePath(`/projects/${projectId}`);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
