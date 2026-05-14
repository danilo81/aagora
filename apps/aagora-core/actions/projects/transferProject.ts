"use server";

import { db } from "@workspace/db";
import { project, user } from "@workspace/db/schema";
import { getAuthUserId } from "@/lib/clerk-auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const transferSchema = z.object({
    id: z.string().uuid("ID de proyecto inválido"),
    newAuthorEmail: z.string().email("Correo electrónico inválido"),
});

export async function transferProject(id: string, newAuthorEmail: string) {
    const parsed = transferSchema.safeParse({ id, newAuthorEmail });
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
    }

    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        // Verify the caller owns the project
        const existing = await db.query.project.findFirst({
            where: eq(project.id, id),
            columns: { authorId: true },
        });
        if (!existing) return { success: false, error: "Proyecto no encontrado" };
        if (existing.authorId !== userId) {
            return { success: false, error: "Solo el propietario puede transferir el proyecto" };
        }

        // Look up the new owner by email
        const [newOwner] = await db
            .select({ id: user.id, email: user.email })
            .from(user)
            .where(eq(user.email, parsed.data.newAuthorEmail))
            .limit(1);

        if (!newOwner) {
            return {
                success: false,
                error: "No se encontró ningún usuario con ese correo electrónico",
            };
        }

        if (newOwner.id === userId) {
            return { success: false, error: "No puedes transferir el proyecto a ti mismo" };
        }

        // Transfer: update authorId — double-check ownership with AND clause
        const result = await db
            .update(project)
            .set({ authorId: newOwner.id, updatedAt: new Date() })
            .where(and(eq(project.id, id), eq(project.authorId, userId)))
            .returning({ id: project.id });

        if (result.length === 0) {
            return { success: false, error: "No se pudo transferir el proyecto" };
        }

        revalidatePath("/projects");
        return { success: true };
    } catch (error: unknown) {
        console.error("[transferProject] Error interno:", error);
        return { success: false, error: "Error al transferir el proyecto" };
    }
}
