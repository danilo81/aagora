'use server';

import { db } from '@workspace/db';
import { constructionItem, projectItem, project, qualityControl, qualityControlSubPoint } from '@workspace/db/schema';
import { eq, asc, inArray } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getConstructionLibraryItems() {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return [];

        const items = await db.query.constructionItem.findMany({
            where: eq(constructionItem.userId, currentUserId),
            orderBy: asc(constructionItem.chapter),
            with: {
                supplies: {
                    with: { supply: true },
                },
            },
        });

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

        return items.map((item) => ({
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
    } catch (error) {
        console.error('Error fetching construction items:', error);
        return [];
    }
}