"use server";

import { db } from "@workspace/db";
import { bankAccount, contact } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function updateBankAccount(id: string, data: {
    bankName?: string;
    accountNumber?: string;
    accountType?: string;
    currency?: string;
    swiftCode?: string;
    isPreferred?: boolean;
}) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const existingAccount = await db.query.bankAccount.findFirst({ where: eq(bankAccount.id, id), columns: { contactId: true } });
        if (!existingAccount) return { success: false, error: "Cuenta bancaria no encontrada." };

        const ownerContact = await db.query.contact.findFirst({ where: eq(contact.id, existingAccount.contactId), columns: { userId: true } });
        if (!ownerContact || ownerContact.userId !== userId) return { success: false, error: "No tienes permisos para modificar esta cuenta bancaria." };

        if (data.isPreferred) {
            await db
                .update(bankAccount)
                .set({ isPreferred: false })
                .where(and(
                    eq(bankAccount.contactId, existingAccount.contactId),
                    eq(bankAccount.isPreferred, true)
                ));
        }

        // Only update fields that exist in the DB (accountType and currency need migration first)
        const { accountType: _at, currency: _cy, ...dbFields } = data;
        const [updated] = await db
            .update(bankAccount)
            .set({ ...dbFields, updatedAt: new Date() })
            .where(eq(bankAccount.id, id))
            .returning();

        if (!updated) return { success: false, error: "Cuenta bancaria no encontrada." };

        revalidatePath("/library/contacts");
        return { success: true, bankAccount: updated };
    } catch (error) {
        console.error("Error updating bank account:", error);
        return { success: false, error: "Error al actualizar la cuenta bancaria." };
    }
}
