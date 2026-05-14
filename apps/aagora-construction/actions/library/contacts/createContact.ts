"use server";

import { db } from "@workspace/db";
import { contact } from "@workspace/db/schema";
import { revalidatePath } from "next/cache";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function createContact(data: {
    name: string;
    phone: string;
    email?: string;
    type?: string;
    company?: string;
    nit?: string;
    address?: string;
    notes?: string;
}) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const [created] = await db
            .insert(contact)
            .values({
                name: data.name.trim(),
                phone: data.phone.trim(),
                email: data.email?.trim() || null,
                type: data.type || "cliente",
                company: data.company?.trim() || null,
                nit: data.nit?.trim() || null,
                address: data.address?.trim() || null,
                notes: data.notes?.trim() || null,
                userId,
            })
            .returning();

        revalidatePath("/library/contacts");
        return { success: true, contact: created };
    } catch (error) {
        console.error("Error creating contact:", error);
        return { success: false, error: "Error al crear el contacto." };
    }
}
