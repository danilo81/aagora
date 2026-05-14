"use server";

import { getAuthUserId } from "@/lib/clerk-auth";
import { db } from "@workspace/db";
import { project, projectContact } from "@workspace/db/schema";
import { and, eq } from "drizzle-orm";

export async function updateProjectContactPermissions(projectId: string, contactId: string, permissions: Record<string, boolean>) {
    const userId = await getAuthUserId();
    if (!userId) return { success: false, error: "No autorizado" };

    try {
        const existing = await db.query.project.findFirst({ where: eq(project.id, projectId), columns: { authorId: true } });
        if (!existing || existing.authorId !== userId) return { success: false, error: "No tienes permisos para gestionar este proyecto." };

        await db.update(projectContact)
            .set({ permissions })
            .where(
                and(
                    eq(projectContact.projectId, projectId),
                    eq(projectContact.contactId, contactId)
                )
            );
        return { success: true };
    } catch (error: any) {
        console.error("Error updating contact permissions:", error);
        return { success: false, error: "Error al actualizar permisos" };
    }
}
