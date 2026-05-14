"use server";

import { db } from "@workspace/db";
import { contact } from "@workspace/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function updateContact(id: string, data: {
    name?: string;
    phone?: string;
    email?: string;
    type?: string;
    status?: string;
    company?: string;
    nit?: string;
    address?: string;
    notes?: string;
}) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const existing = await db.query.contact.findFirst({ where: eq(contact.id, id), columns: { userId: true } });
        if (!existing || existing.userId !== userId) return { success: false, error: "No tienes permisos para modificar este contacto." };

        const [updated] = await db
            .update(contact)
            .set({ ...data, updatedAt: new Date() })
            .where(and(eq(contact.id, id), eq(contact.userId, userId)))
            .returning();

        if (!updated) return { success: false, error: "Contacto no encontrado." };

        revalidatePath("/library/contacts");
        return { success: true, contact: updated };
    } catch (error) {
        console.error("Error updating contact:", error);
        return { success: false, error: "Error al actualizar el contacto." };
    }
}
