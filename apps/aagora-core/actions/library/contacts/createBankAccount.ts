"use server";

import { db } from "@workspace/db";
import { bankAccount, contact } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function createBankAccount(data: {
    contactId: string;
    bankName: string;
    accountNumber: string;
    accountType?: string;
    currency?: string;
    swiftCode?: string;
    isPreferred?: boolean;
}) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const ownerContact = await db.query.contact.findFirst({ where: eq(contact.id, data.contactId), columns: { userId: true } });
        if (!ownerContact || ownerContact.userId !== userId) return { success: false, error: "No tienes permisos para modificar este contacto." };

        if (data.isPreferred) {
            await db
                .update(bankAccount)
                .set({ isPreferred: false })
                .where(eq(bankAccount.contactId, data.contactId));
        }

        const [created] = await db
            .insert(bankAccount)
            .values({
                contactId: data.contactId,
                bankName: data.bankName.trim(),
                accountNumber: data.accountNumber.trim(),
                swiftCode: data.swiftCode?.trim() || null,
                isPreferred: data.isPreferred ?? false,
            })
            .returning();

        revalidatePath("/library/contacts");
        return { success: true, bankAccount: created };
    } catch (error) {
        console.error("Error creating bank account:", error);
        return { success: false, error: "Error al crear la cuenta bancaria." };
    }
}
