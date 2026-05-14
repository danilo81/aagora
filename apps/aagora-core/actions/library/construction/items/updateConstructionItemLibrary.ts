'use server';

import { db } from '@workspace/db';
import { constructionItem, constructionItemSupply, supply, qualityControl, qualityControlSubPoint } from '@workspace/db/schema';
import { type SupplyInput, type QualityControlInput } from '@workspace/db/validation';
import { eq, ilike, and, ne } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function updateConstructionItemLibrary(id: string, data: {
    chapter?: string;
    description?: string;
    unit?: string;
    performance?: number;
    performanceHH?: number;
    directCost?: number;
    total?: number;
    supplies?: SupplyInput[];
    qualityControls?: QualityControlInput[];
}) {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return { success: false, error: 'No autorizado' };

        const existing = await db.query.constructionItem.findFirst({ where: eq(constructionItem.id, id), columns: { userId: true } });
        if (!existing || existing.userId !== currentUserId) return { success: false, error: 'No tienes permisos para actualizar esta partida.' };

        if (data.description) {
            const dup = await db.query.constructionItem.findFirst({
                where: and(ne(constructionItem.id, id), eq(constructionItem.userId, currentUserId), ilike(constructionItem.description, data.description)),
            });
            if (dup) return { success: false, error: `Ya existe otra partida con la descripción "${data.description}".` };
        }

        const setData: Record<string, any> = { updatedAt: new Date() };
        if (data.chapter !== undefined) setData.chapter = data.chapter;
        if (data.description !== undefined) setData.description = data.description;
        if (data.unit !== undefined) setData.unit = data.unit;
        if (data.performance !== undefined) setData.performance = Number(data.performance) || 0;
        if (data.performanceHH !== undefined) setData.performanceHH = Math.max(1, Math.round(Number(data.performanceHH) || 1));
        if (data.directCost !== undefined) setData.directCost = Number(data.directCost) || 0;
        if (data.total !== undefined) setData.total = Number(data.total) || 0;

        const [item] = await db.update(constructionItem).set(setData).where(eq(constructionItem.id, id)).returning();

        if (data.supplies) {
            await db.delete(constructionItemSupply).where(eq(constructionItemSupply.itemId, id));
            for (const s of data.supplies) {
                let supplyId = s.id;
                if (s.isNew || s.id?.startsWith('temp-')) {
                    const found = await db.query.supply.findFirst({
                        where: and(eq(supply.userId, currentUserId), ilike(supply.description, s.description)),
                    });
                    if (found) {
                        supplyId = found.id;
                    } else {
                        const [ns] = await db.insert(supply).values({
                            typology: s.typology, description: s.description,
                            unit: s.unit, price: Number(s.price) || 0, userId: currentUserId,
                        }).returning();
                        supplyId = ns.id;
                    }
                }
                if (supplyId) {
                    await db.insert(constructionItemSupply).values({ itemId: id, supplyId, quantity: Number(s.quantity) || 0 });
                }
            }
        }

        if (data.qualityControls) {
            await db.delete(qualityControl).where(eq(qualityControl.itemId, id));
            for (const qc of data.qualityControls) {
                const [newQc] = await db.insert(qualityControl).values({ description: qc.description, itemId: id }).returning();
                if (qc.subPoints?.length) {
                    await db.insert(qualityControlSubPoint).values(
                        qc.subPoints.map((sp: any) => ({ description: sp.description, qualityControlId: newQc.id }))
                    );
                }
            }
        }

        revalidatePath('/library/construction/items');
        return { success: true, item };
    } catch (error: any) {
        console.error('Error updating construction item:', error);
        return { success: false, error: 'Fallo al actualizar el ítem.' };
    }
}