'use server';

import { db } from '@workspace/db';
import { constructionItem, constructionItemSupply, supply, qualityControl, qualityControlSubPoint } from '@workspace/db/schema';
import { type SupplyInput, type QualityControlInput } from '@workspace/db/validation';
import { eq, ilike, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function createConstructionItemLibrary(data: {
    chapter: string;
    description: string;
    unit: string;
    performance: number;
    performanceHH: number;
    directCost: number;
    total: number;
    supplies?: SupplyInput[];
    qualityControls?: QualityControlInput[];
}) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'Usuario no autenticado. Inicie sesión nuevamente.' };

        const existing = await db.query.constructionItem.findFirst({
            where: and(eq(constructionItem.userId, currentUserId), ilike(constructionItem.description, data.description)),
        });
        if (existing) return { success: false, error: `Ya existe una partida con la descripción "${data.description}" en tu catálogo.` };

        const [item] = await db.insert(constructionItem).values({
            chapter: data.chapter,
            description: data.description,
            unit: data.unit,
            performance: Number(data.performance) || 0,
            performanceHH: Math.max(1, Math.round(Number(data.performanceHH) || 1)),
            directCost: Number(data.directCost) || 0,
            total: Number(data.total) || 0,
            userId: currentUserId,
        }).returning();

        if (!item) return { success: false, error: 'Error al crear el ítem.' };

        for (const s of data.supplies ?? []) {
            let supplyId = s.id;
            if (s.isNew || s.id?.startsWith('temp-')) {
                const existingSupply = await db.query.supply.findFirst({
                    where: and(eq(supply.userId, currentUserId), ilike(supply.description, s.description)),
                });
                if (existingSupply) {
                    supplyId = existingSupply.id;
                } else {
                    const [newSupply] = await db.insert(supply).values({
                        typology: s.typology ?? '',
                        description: s.description,
                        unit: s.unit,
                        price: Number(s.price) || 0,
                        userId: currentUserId,
                    }).returning();
                    if (newSupply) supplyId = newSupply.id;
                }
            }
            if (supplyId) {
                await db.insert(constructionItemSupply).values({
                    itemId: item.id,
                    supplyId,
                    quantity: Number(s.quantity) || 0,
                });
            }
        }

        for (const qc of data.qualityControls ?? []) {
            const [newQc] = await db.insert(qualityControl).values({
                description: qc.description,
                itemId: item.id,
            }).returning();
            if (newQc && qc.subPoints?.length) {
                await db.insert(qualityControlSubPoint).values(
                    qc.subPoints.map((sp: any) => ({ description: sp.description, qualityControlId: newQc.id }))
                );
            }
        }

        revalidatePath('/library/construction/items');
        return { success: true, item };
    } catch (error: any) {
        console.error('Error creating construction item:', error);
        return { success: false, error: 'Error interno al registrar el ítem.' };
    }
}