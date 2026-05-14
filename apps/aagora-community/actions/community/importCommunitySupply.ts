'use server';

import { db, supply, supplyCost, contact } from '@workspace/db';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function importCommunitySupply(supplyId: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) {
            return { success: false, error: 'No autorizado' };
        }

        // Find the public source supply with its preferred cost
        const [sourceSupply] = await db.select().from(supply)
            .where(and(eq(supply.id, supplyId), eq(supply.isPublic, true)))
            .limit(1);

        if (!sourceSupply) {
            return { success: false, error: 'Insumo no encontrado o no es público.' };
        }

        const providerName = 'Proveedor Comunitario';

        // Find or create a contact for the provider
        const [existingContact] = await db.select().from(contact)
            .where(and(
                eq(contact.userId, userId),
                eq(contact.name, providerName),
                eq(contact.type, 'proveedor'),
            ))
            .limit(1);

        let targetContact = existingContact;

        if (!targetContact) {
            const [created] = await db.insert(contact).values({
                name: providerName,
                phone: '',
                type: 'proveedor',
                status: 'active',
                userId,
                notes: `Importado de la comunidad.`,
            }).returning();
            targetContact = created;
        }

        // Create the new private copy of the supply
        const [newSupply] = await db.insert(supply).values({
            typology: sourceSupply.typology,
            description: sourceSupply.description,
            unit: sourceSupply.unit,
            price: sourceSupply.price,
            tag: sourceSupply.tag,
            category: sourceSupply.category,
            isPublic: false,
            userId,
        }).returning();

        // Create the preferred cost linked to the provider contact
        await db.insert(supplyCost).values({
            supplyId: newSupply.id,
            supplierId: targetContact.id,
            price: sourceSupply.price,
            isPreferred: true,
            date: new Date(),
        });

        revalidatePath('/community/supplies');
        return { success: true, supply: newSupply };
    } catch (error) {
        console.error('Error importing community supply:', error);
        return { success: false, error: 'Error al importar el insumo.' };
    }
}
