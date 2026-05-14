"use server";

import { db } from "@workspace/db";
import { warehouseMovement, project, supply } from "@workspace/db/schema";
import { eq, desc, inArray } from "drizzle-orm";
import { getAccessibleProjectIds } from "./getAccessibleProjectIds";

export async function getGlobalWarehouseMovements() {
    try {
        const access = await getAccessibleProjectIds();
        if (!access || access.collabIds.length === 0) return [];

        const results = await db.select({
            id: warehouseMovement.id,
            type: warehouseMovement.type,
            itemCount: warehouseMovement.quantity,
            description: supply.description,
            notes: warehouseMovement.notes,
            projectName: project.title,
            date: warehouseMovement.createdAt,
        })
        .from(warehouseMovement)
        .where(inArray(warehouseMovement.projectId, access.collabIds))
        .leftJoin(project, eq(warehouseMovement.projectId, project.id))
        .leftJoin(supply, eq(warehouseMovement.supplyId, supply.id))
        .orderBy(desc(warehouseMovement.createdAt))
        .limit(20);
        
        return results.map(m => ({
            ...m,
            type: (m.type === 'entry' || m.type === 'ingreso') ? 'ingreso' : 'salida'
        }));
    } catch (error) {
        console.error("Error fetching global warehouse movements:", error);
        return [];
    }
}
