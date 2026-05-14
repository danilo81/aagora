'use server';

import { db, project, user, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function transferProject(projectId: string, targetEmail: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'Sesión no válida o expirada. Por favor, inicie sesión nuevamente.' };

        const [proj] = await db.select({ authorId: project.authorId, title: project.title })
            .from(project).where(eq(project.id, projectId)).limit(1);

        if (!proj) return { success: false, error: 'Proyecto no encontrado.' };
        if (proj.authorId !== userId) return { success: false, error: 'No tienes permisos para transferir este proyecto. Solo el autor puede hacerlo.' };

        // Look up target user by email in user table
        const [targetUser] = await db.select({ id: user.id, name: user.name })
            .from(user).where(eq(user.email, targetEmail)).limit(1);

        if (!targetUser) return { success: false, error: `El usuario "${targetEmail}" no está registrado en el sistema.` };
        // Note: targetUser.id is UUID, userId is Clerk ID - can't compare directly
        // Transfer to the target user's Clerk ID equivalent — we use the targetUser's DB id as the new authorId
        // since authorId is text and can store UUID or Clerk ID

        await db.update(project)
            .set({ authorId: targetUser.id })
            .where(eq(project.id, projectId));

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'info',
            content: `TRANSFERENCIA DE PROPIEDAD: El proyecto "${proj.title}" ha sido transferido a ${targetUser.name || targetEmail}.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath('/projects');
        revalidatePath(`/projects/${projectId}`);

        return { success: true };
    } catch (error: any) {
        console.error("Transfer project error:", error);
        return { success: false, error: 'Fallo al procesar la transferencia.' };
    }
}