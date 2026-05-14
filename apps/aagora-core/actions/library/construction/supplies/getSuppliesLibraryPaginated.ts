'use server';

import { db } from '@workspace/db';
import { supply } from '@workspace/db/schema';
import { eq, and, ilike, or, count, asc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getSuppliesLibraryPaginated(
    _userId?: string,
    page: number = 1,
    pageSize: number = 100,
    searchTerm: string = '',
    typology: string = 'all'
) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'No autorizado. Por favor, inicie sesión nuevamente.' };

        const skip = (page - 1) * pageSize;

        const conditions = [eq(supply.userId, currentUserId)];
        if (typology !== 'all') conditions.push(eq(supply.typology, typology));
        if (searchTerm) {
            conditions.push(
                or(
                    ilike(supply.description, `%${searchTerm}%`),
                    ilike(supply.unit, `%${searchTerm}%`)
                )!
            );
        }
        const where = and(...conditions);

        const [supplies, [{ total: totalCount }]] = await Promise.all([
            db.query.supply.findMany({
                where,
                orderBy: asc(supply.description),
                offset: skip,
                limit: pageSize,
                with: {
                    costs: {
                        orderBy: (c, { desc }) => [desc(c.date)],
                        with: { supplier: true },
                    },
                },
            }),
            db.select({ total: count() }).from(supply).where(where),
        ]);

        const formattedSupplies = supplies.map((s) => ({
            ...s,
            updatedAt: s.updatedAt?.toISOString() ?? null,
            costs: s.costs.map((c) => ({
                ...c,
                date: c.date?.toISOString().slice(0, 10) ?? null,
            })),
        }));

        return {
            success: true,
            supplies: formattedSupplies,
            totalCount,
            hasMore: skip + supplies.length < totalCount,
            page,
        };
    } catch (error: any) {
        console.error('[getSuppliesLibraryPaginated] ERROR:', error);
        return { success: false, error: `Error al obtener los insumos: ${'Error desconocido'}` };
    }
}