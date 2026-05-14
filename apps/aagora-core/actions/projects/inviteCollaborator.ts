"use server";

import { getAuthUserId } from "@/lib/clerk-auth";
import { db } from "@workspace/db";
import { contact, project, projectContact } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

export async function inviteCollaborator(projectId: string, email: string) {
    const userId = await getAuthUserId();
    if (!userId) return { success: false, error: "No autorizado" };

    try {
        const ownerCheck = await db.query.project.findFirst({ where: eq(project.id, projectId), columns: { authorId: true } });
        if (!ownerCheck || ownerCheck.authorId !== userId) return { success: false, error: "No tienes permisos para invitar colaboradores a este proyecto." };

        const existingContact = await db.query.contact.findFirst({
            where: eq(contact.email, email)
        });

        if (!existingContact) {
            return { success: false, error: "No se encontró ningún contacto con ese correo" };
        }

        await db.insert(projectContact).values({
            projectId,
            contactId: existingContact.id,
            addedById: userId,
            permissions: {},
        }).onConflictDoNothing();

        return { success: true };
    } catch (error: any) {
        console.error("Error inviting collaborator:", error);
        return { success: false, error: "Error al invitar colaborador" };
    }
}
