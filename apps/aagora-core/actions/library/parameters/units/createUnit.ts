'use server';

import { db } from '@workspace/db';
import { unit } from '@workspace/db/schema';
import { eq, and, or, ilike } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';
import { UNIT_NAME_REGEX as NAME_REGEX, UNIT_ABBR_REGEX as ABBR_REGEX } from '@/lib/validations';

export async function createUnit(data: {
    name: string;
    abbreviation: string;
    magnitude: string;
}) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'No autorizado' };

        const trimmedName = data.name.trim();
        const trimmedAbbr = data.abbreviation.trim();

        if (!trimmedName)
            return { success: false, error: 'El nombre de la unidad no puede estar vacío.' };
        if (!NAME_REGEX.test(trimmedName))
            return { success: false, error: 'El nombre contiene caracteres especiales no permitidos.' };
        if (!trimmedAbbr)
            return { success: false, error: 'La abreviación no puede estar vacía.' };
        if (!ABBR_REGEX.test(trimmedAbbr))
            return { success: false, error: 'La abreviación contiene caracteres especiales no permitidos. Solo letras, números y símbolos (² ³ ° % /).' };

        const existing = await db.query.unit.findFirst({
            where: and(
                eq(unit.userId, currentUserId),
                or(
                    ilike(unit.name, trimmedName),
                    ilike(unit.abbreviation, trimmedAbbr)
                )
            ),
        });

        if (existing) {
            const isSameName = existing.name.toLowerCase() === trimmedName.toLowerCase();
            return {
                success: false,
                error: isSameName
                    ? `La unidad "${trimmedName}" ya existe en tu catálogo.`
                    : `La abreviación "${trimmedAbbr}" ya está asignada a la unidad "${existing.name}".`,
            };
        }

        const [created] = await db
            .insert(unit)
            .values({
                name: trimmedName,
                abbreviation: trimmedAbbr,
                magnitude: data.magnitude,
                userId: currentUserId,
            })
            .returning();

        revalidatePath('/library/parameters/units');
        return { success: true, unit: created };
    } catch (error) {
        console.error('Error creating unit:', error);
        return { success: false, error: 'Error al crear la unidad.' };
    }
}