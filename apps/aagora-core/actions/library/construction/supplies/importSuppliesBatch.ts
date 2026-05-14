'use server';

import { db } from '@workspace/db';
import { supply, unit } from '@workspace/db/schema';
import { type ImportSupplyRow } from '@workspace/db/validation';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function importSuppliesBatch(data: ImportSupplyRow[]) {
    const ALLOWED_NAME_REGEX = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-()/.,']+$/;
    const VALID_TIPOLOGIAS = ['Material', 'Mano de Obra', 'Equipo'];
    try {
        const userId = await getAuthUserId();

        if (!userId) {
            return { success: false, error: 'Usuario no autenticado.' };
        }

        const [validUnits, existingSupplies] = await Promise.all([
            db.select({ abbreviation: unit.abbreviation }).from(unit),
            db.select({ description: supply.description }).from(supply).where(eq(supply.userId, userId)),
        ]);

        const validAbbreviations = validUnits.map(u => u.abbreviation.toUpperCase());
        const existingDescriptions = new Set(existingSupplies.map(s => s.description.toUpperCase()));

        const formattedData = [];
        const errors = [];

        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            if (!row) continue;
            const rowNum = i + 1;

            const nombre = (row.Nombre || '').toString().trim();
            const unitAbbr = (row.Unidad || '').toString().trim().toUpperCase();

            if (!nombre || !ALLOWED_NAME_REGEX.test(nombre)) {
                errors.push(`Fila ${rowNum}: El nombre "${nombre}" contiene caracteres especiales no permitidos.`);
                continue;
            }
            const tipologia = (row.Tipologia || 'Material').toString().trim();
            if (tipologia && !VALID_TIPOLOGIAS.includes(tipologia)) {
                errors.push(`Fila ${rowNum}: La tipología "${tipologia}" no es válida. Use: Material, Mano de Obra o Equipo.`);
                continue;
            }

            if (!validAbbreviations.includes(unitAbbr)) {
                errors.push(`Fila ${rowNum}: La unidad "${unitAbbr}" no existe en el sistema.`);
                continue;
            }

            if (existingDescriptions.has(nombre.toUpperCase())) {
                errors.push(`Fila ${rowNum}: El insumo "${nombre}" ya existe en su catálogo.`);
                continue;
            }
            const parsedCost = typeof row.Costo === 'number' ? row.Costo : parseFloat(row.Costo?.toString().replace(',', '.') || '0');

            if (isNaN(parsedCost) || parsedCost < 0) {
                errors.push(`Fila ${rowNum}: Costo inválido.`);
                continue;
            }

            formattedData.push({
                userId: userId,
                description: nombre || 'Sin descripción',
                typology: (row.Tipologia || 'Material').toString().trim() || 'Material',
                unit: unitAbbr,
                price: parsedCost,
            });
        }

        if (errors.length > 0) {
            return {
                success: false,
                error: `Se encontraron ${errors.length} problemas.`,
                details: errors
            };
        }

        if (formattedData.length === 0) {
            return { success: false, error: 'No hay datos válidos o nuevos para importar.' };
        }

        await db.insert(supply).values(formattedData).onConflictDoNothing();

        revalidatePath('/library/construction/supplies');
        return { success: true, count: formattedData.length };

    } catch (error: unknown) {
        console.error("Error en importación:", error);
        return { success: false, error: 'Error interno del servidor.' };
    }
}