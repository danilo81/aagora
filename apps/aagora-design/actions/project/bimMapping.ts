'use server';

import { db, bimElementMapping, projectItem } from '@workspace/db';
import { eq, and, inArray, sql } from 'drizzle-orm';
import { revalidatePath } from "next/cache";

export async function assignElementToItem(
    projectId: string,
    projectItemId: string,
    elementId: string,
    elementName: string | null = null,
    quantity: number,
    unit: string
) {
    try {
        const projectItems = await db.select({ id: projectItem.id })
            .from(projectItem)
            .where(eq(projectItem.projectId, projectId));
        const piIds = projectItems.map(p => p.id);

        if (piIds.length > 0) {
            const existingMappings = await db.select().from(bimElementMapping).where(
                and(eq(bimElementMapping.elementId, elementId), inArray(bimElementMapping.projectItemId, piIds))
            );
            if (existingMappings.length > 0) {
                await db.delete(bimElementMapping).where(
                    inArray(bimElementMapping.id, existingMappings.map(m => m.id))
                );
            }
        }

        const [mapping] = await db.insert(bimElementMapping).values({
            projectItemId,
            elementId,
            elementName,
            quantity,
            unit
        }).returning();

        const totalResult = await db.select({ total: sql<number>`sum(quantity)` })
            .from(bimElementMapping)
            .where(eq(bimElementMapping.projectItemId, projectItemId));
        const total = totalResult[0]?.total || 0;

        await db.update(projectItem)
            .set({ quantity: total })
            .where(eq(projectItem.id, projectItemId));

        revalidatePath(`/projects/${projectId}/design`);
        return { success: true, mapping };
    } catch (error: unknown) {
        console.error("Error asignando elemento BIM:", error);
        return { success: false, error: 'Unknown error' };
    }
}

export async function removeElementMapping(projectId: string, elementId: string) {
    try {
        const projectItems = await db.select({ id: projectItem.id })
            .from(projectItem)
            .where(eq(projectItem.projectId, projectId));
        const piIds = projectItems.map(p => p.id);

        if (piIds.length === 0) return { success: true };

        const existingMappings = await db.select().from(bimElementMapping).where(
            and(eq(bimElementMapping.elementId, elementId), inArray(bimElementMapping.projectItemId, piIds))
        );

        if (existingMappings.length === 0) return { success: true };

        const piId = existingMappings[0]!.projectItemId;

        await db.delete(bimElementMapping).where(
            inArray(bimElementMapping.id, existingMappings.map(m => m.id))
        );

        const totalResult = await db.select({ total: sql<number>`sum(quantity)` })
            .from(bimElementMapping)
            .where(eq(bimElementMapping.projectItemId, piId));
        const total = totalResult[0]?.total || 0;

        await db.update(projectItem)
            .set({ quantity: total })
            .where(eq(projectItem.id, piId));

        revalidatePath(`/projects/${projectId}/design`);
        return { success: true };
    } catch (error: unknown) {
        console.error("Error removiendo asignación BIM:", error);
        return { success: false, error: 'Unknown error' };
    }
}

export async function getMappedElements(projectId: string) {
    try {
        const projectItems = await db.select({ id: projectItem.id })
            .from(projectItem)
            .where(eq(projectItem.projectId, projectId));
        const piIds = projectItems.map(p => p.id);

        if (piIds.length === 0) return [];

        return await db.select({
            elementId: bimElementMapping.elementId,
            projectItemId: bimElementMapping.projectItemId,
            quantity: bimElementMapping.quantity
        }).from(bimElementMapping).where(inArray(bimElementMapping.projectItemId, piIds));
    } catch (error) {
        console.error("Error obteniendo elementos mapeados:", error);
        return [];
    }
}

export async function getMappedElementsForItem(projectItemId: string) {
    try {
        return await db.select({
            elementId: bimElementMapping.elementId,
            quantity: bimElementMapping.quantity
        }).from(bimElementMapping).where(eq(bimElementMapping.projectItemId, projectItemId));
    } catch (error) {
        console.error("Error obteniendo elementos mapeados por item:", error);
        return [];
    }
}
