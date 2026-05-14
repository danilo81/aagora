"use server";

import { db } from "@workspace/db";
import { bankAccount, contact } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function deleteBankAccount(id: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const existingAccount = await db.query.bankAccount.findFirst({ where: eq(bankAccount.id, id), columns: { contactId: true } });
        if (!existingAccount) return { success: false, error: "Cuenta bancaria no encontrada." };

        const ownerContact = await db.query.contact.findFirst({ where: eq(contact.id, existingAccount.contactId), columns: { userId: true } });
        if (!ownerContact || ownerContact.userId !== userId) return { success: false, error: "No tienes permisos para eliminar esta cuenta bancaria." };

        const [deleted] = await db
            .delete(bankAccount)
            .where(eq(bankAccount.id, id))
            .returning();

        if (!deleted) return { success: false, error: "Cuenta bancaria no encontrada." };

        revalidatePath("/library/contacts");
        return { success: true };
    } catch (error) {
        console.error("Error deleting bank account:", error);
        return { success: false, error: "Error al eliminar la cuenta bancaria." };
    }
}
