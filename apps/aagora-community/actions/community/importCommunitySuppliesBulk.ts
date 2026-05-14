'use server';

import { db, supply, supplyCost, contact } from '@workspace/db';
import { eq, and, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function importCommunitySuppliesBulk(supplyIds: string[]) {
    try {
        const userId = await getAuthUserId();
        if (!userId) {
            return { success: false, error: 'No autorizado' };
        }

        if (!supplyIds || supplyIds.length === 0) {
            return { success: false, error: 'No se proporcionaron IDs de insumos.' };
        }

        // Fetch all public source supplies at once
        const sourceSupplies = await db.select().from(supply)
            .where(and(eq(supply.isPublic, true), inArray(supply.id, supplyIds)));

        if (sourceSupplies.length === 0) {
            return { success: false, error: 'No se encontraron insumos públicos para importar.' };
        }

        // Find or create a single community provider contact
        const providerName = 'Proveedor Comunitario';

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
                notes: 'Importado de la comunidad (masivo).',
            }).returning();
            targetContact = created;
        }

        // Insert all new supplies at once
        const newSupplies = await db.insert(supply).values(
            sourceSupplies.map((s) => ({
                typology: s.typology,
                description: s.description,
                unit: s.unit,
                price: s.price,
                tag: s.tag,
                category: s.category,
                isPublic: false,
                userId,
            }))
        ).returning();

        // Insert all supply costs at once
        if (newSupplies.length > 0) {
            await db.insert(supplyCost).values(
                newSupplies.map((s, i) => ({
                    supplyId: s.id,
                    supplierId: targetContact.id,
                    price: sourceSupplies[i]?.price ?? 0,
                    isPreferred: true,
                    date: new Date(),
                }))
            );
        }

        revalidatePath('/community/supplies');
        return {
            success: true,
            message: `${newSupplies.length} insumos importados correctamente.`,
            count: newSupplies.length,
        };
    } catch (error) {
        console.error('Error importing bulk community supplies:', error);
        return { success: false, error: 'Error al importar los insumos.' };
    }
}
