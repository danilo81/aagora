'use server';

import { db } from '@workspace/db';
import { unit } from '@workspace/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';
import { UNIT_NAME_REGEX as NAME_REGEX, UNIT_ABBR_REGEX as ABBR_REGEX } from '@/lib/validations';

export async function updateUnit(id: string, data: {
    name?: string;
    abbreviation?: string;
    magnitude?: string;
}) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'No autorizado' };

        const owned = await db.query.unit.findFirst({
            where: and(eq(unit.id, id), eq(unit.userId, currentUserId)),
            columns: { id: true },
        });
        if (!owned) return { success: false, error: 'Unidad no encontrada o sin permisos.' };

        const cleanData: { name?: string; abbreviation?: string; magnitude?: string } = {};

        if (data.name !== undefined) {
            const trimmedName = data.name.trim();
            if (!trimmedName)
                return { success: false, error: 'El nombre de la unidad no puede estar vacío.' };
            if (!NAME_REGEX.test(trimmedName))
                return { success: false, error: 'El nombre contiene caracteres especiales no permitidos.' };
            cleanData.name = trimmedName;
        }

        if (data.abbreviation !== undefined) {
            const trimmedAbbr = data.abbreviation.trim();
            if (!trimmedAbbr)
                return { success: false, error: 'La abreviación no puede estar vacía.' };
            if (!ABBR_REGEX.test(trimmedAbbr))
                return { success: false, error: 'La abreviación contiene caracteres especiales no permitidos.' };
            cleanData.abbreviation = trimmedAbbr;
        }

        if (data.magnitude !== undefined) {
            cleanData.magnitude = data.magnitude;
        }

        const [updated] = await db
            .update(unit)
            .set({ ...cleanData, updatedAt: new Date() })
            .where(eq(unit.id, id))
            .returning();

        revalidatePath('/library/parameters/units');
        return { success: true, unit: updated };
    } catch (error) {
        console.error('Error updating unit:', error);
        return { success: false, error: 'Error al actualizar la unidad.' };
    }
}