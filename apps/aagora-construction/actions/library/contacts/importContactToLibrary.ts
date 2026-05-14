'use server';

import { db } from '@workspace/db';
import { contact, bankAccount } from '@workspace/db/schema';
import { eq, and } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from 'next/cache';

export async function importContactToLibrary(contactId: string) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'No autorizado' };

        const source = await db.query.contact.findFirst({
            where: eq(contact.id, contactId),
            with: { bankAccounts: true },
        });
        if (!source) return { success: false, error: 'Contacto original no encontrado' };

        if (source.nit) {
            const dup = await db.query.contact.findFirst({
                where: and(eq(contact.userId, currentUserId), eq(contact.nit, source.nit)),
            });
            if (dup) return { success: false, error: 'Este contacto ya existe en tu librería global.' };
        }

        const [newContact] = await db.insert(contact).values({
            name: source.name,
            email: source.email ?? null,
            phone: source.phone,
            type: source.type,
            status: source.status,
            company: source.company ?? null,
            nit: source.nit ?? null,
            address: source.address ?? null,
            notes: source.notes ?? null,
            userId: currentUserId,
        }).returning();

        if (source.bankAccounts.length) {
            await db.insert(bankAccount).values(
                source.bankAccounts.map((ba) => ({
                    contactId: newContact.id,
                    bankName: ba.bankName,
                    accountNumber: ba.accountNumber,
                    swiftCode: ba.swiftCode ?? null,
                    isPreferred: ba.isPreferred,
                }))
            );
        }

        revalidatePath('/library/contacts');
        return { success: true, contact: newContact };
    } catch (error: any) {
        console.error('Error importing contact:', error);
        return { success: false, error: 'Error al importar contacto' };
    }
}