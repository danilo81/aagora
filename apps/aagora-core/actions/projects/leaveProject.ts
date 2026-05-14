"use server";

import { db } from "@workspace/db";
import { project, projectContact, contact, user } from "@workspace/db/schema";
import { getAuthUserId } from "@/lib/clerk-auth";
import { and, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const leaveSchema = z.object({
    id: z.string().uuid("ID de proyecto inválido"),
});

export async function leaveProject(id: string) {
    const parsed = leaveSchema.safeParse({ id });
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
    }

    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        // The project owner cannot leave their own project — they must transfer it first
        const existing = await db.query.project.findFirst({
            where: eq(project.id, id),
            columns: { authorId: true },
        });
        if (!existing) return { success: false, error: "Proyecto no encontrado" };
        if (existing.authorId === userId) {
            return {
                success: false,
                error: "No puedes abandonar un proyecto del que eres propietario. Transfiere la propiedad primero.",
            };
        }

        // Find the contact record linked to the current user (matched by email)
        const clerkUser = await currentUser();
        const email = clerkUser?.primaryEmailAddress?.emailAddress;
        if (!email) return { success: false, error: "No se pudo obtener el correo del usuario" };

        const [dbUser] = await db
            .select({ id: user.id })
            .from(user)
            .where(eq(user.email, email))
            .limit(1);

        // Also try to find via the contact table (collaborators may be stored there)
        const [userContact] = await db
            .select({ id: contact.id })
            .from(contact)
            .where(eq(contact.email, email))
            .limit(1);

        if (!userContact) {
            return {
                success: false,
                error: "No se encontró tu registro de contacto en este proyecto",
            };
        }

        // Remove from projectContact
        const result = await db
            .delete(projectContact)
            .where(
                and(
                    eq(projectContact.projectId, id),
                    eq(projectContact.contactId, userContact.id)
                )
            )
            .returning({ id: projectContact.id });

        if (result.length === 0) {
            return {
                success: false,
                error: "No eras colaborador de este proyecto o ya habías salido",
            };
        }

        revalidatePath("/projects");
        return { success: true };
    } catch (error: unknown) {
        console.error("[leaveProject] Error interno:", error);
        return { success: false, error: "Error al abandonar el proyecto" };
    }
}
