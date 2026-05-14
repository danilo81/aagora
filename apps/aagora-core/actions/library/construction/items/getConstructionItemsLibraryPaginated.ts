'use server';

import { db } from '@workspace/db';
import { constructionItem, projectItem, qualityControl } from '@workspace/db/schema';
import { eq, and, or, ilike, count, asc, inArray } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getConstructionItemsLibraryPaginated(
    page: number = 1,
    pageSize: number = 50,
    searchTerm: string = ''
) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'No autorizado' };

        const skip = (page - 1) * pageSize;

        const conditions = [eq(constructionItem.userId, currentUserId)];
        if (searchTerm) {
            conditions.push(or(
                ilike(constructionItem.description, `%${searchTerm}%`),
                ilike(constructionItem.chapter, `%${searchTerm}%`),
            )!);
        }
        const where = and(...conditions);

        const [items, countResult] = await Promise.all([
            db.query.constructionItem.findMany({
                where,
                orderBy: [asc(constructionItem.chapter), asc(constructionItem.description)],
                offset: skip,
                limit: pageSize,
                with: { supplies: { with: { supply: true } } },
            }),
            db.select({ total: count() }).from(constructionItem).where(where),
        ]);

        const totalCount = countResult[0]?.total ?? 0;

        const itemIds = items.map((i) => i.id);

        const [projectLinks, qualityControls] = itemIds.length
            ? await Promise.all([
                db.query.projectItem.findMany({
                    where: inArray(projectItem.itemId, itemIds),
                    with: { project: { columns: { title: true } } },
                }),
                db.query.qualityControl.findMany({
                    where: inArray(qualityControl.itemId, itemIds),
                    with: { subPoints: true },
                }),
            ])
            : [[], []];

        const projectTitleByItemId = projectLinks.reduce((acc, l) => {
            if (!acc[l.itemId] && l.project?.title) acc[l.itemId] = l.project.title;
            return acc;
        }, {} as Record<string, string>);

        const qcByItemId = qualityControls.reduce((acc, qc) => {
            (acc[qc.itemId] ??= []).push(qc);
            return acc;
        }, {} as Record<string, typeof qualityControls>);

        const formattedItems = items.map((item) => ({
            ...item,
            supplies: item.supplies.map((s) => ({
                id: s.supply.id,
                description: s.supply.description,
                unit: s.supply.unit,
                price: s.supply.price,
                quantity: s.quantity,
                subtotal: s.quantity * s.supply.price,
                typology: s.supply.typology,
            })),
            qualityControls: (qcByItemId[item.id] ?? []).map((qc) => ({
                id: qc.id,
                description: qc.description,
                subPoints: qc.subPoints.map((sp) => ({ id: sp.id, description: sp.description })),
            })),
            localProjectTitle: projectTitleByItemId[item.id] ?? null,
        }));

        return { success: true, items: formattedItems, totalCount, hasMore: skip + items.length < totalCount, page };
    } catch (error) {
        console.error('Error fetching construction items:', error);
        return { success: false, error: 'Error al obtener los items de la librería' };
    }
}