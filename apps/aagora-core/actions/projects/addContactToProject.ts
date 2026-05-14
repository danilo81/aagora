"use server";

import { getAuthUserId } from "@/lib/clerk-auth";
import { db } from "@workspace/db";
import { project, projectContact } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

export async function addContactToProject(projectId: string, contactId: string) {
    const userId = await getAuthUserId();
    if (!userId) return { success: false, error: "No autorizado" };

    try {
        const existing = await db.query.project.findFirst({ where: eq(project.id, projectId), columns: { authorId: true } });
        if (!existing || existing.authorId !== userId) return { success: false, error: "No tienes permisos para gestionar este proyecto." };

        await db.insert(projectContact).values({
            projectId,
            contactId,
            addedById: userId,
            permissions: {},
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error adding contact to project:", error);
        return { success: false, error: "Error al añadir miembro" };
    }
}
