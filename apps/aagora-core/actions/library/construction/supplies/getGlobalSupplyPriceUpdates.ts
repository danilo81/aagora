"use server";

import { db } from "@workspace/db";
import { supplyCost, supply } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getGlobalSupplyPriceUpdates() {
    try {
        const results = await db.select({
            id: supplyCost.id,
            itemName: supply.description,
            price: supplyCost.price,
            date: supplyCost.date,
        })
        .from(supplyCost)
        .leftJoin(supply, eq(supplyCost.supplyId, supply.id))
        .orderBy(desc(supplyCost.date))
        .limit(20);
        
        return results;
    } catch (error) {
        console.error("Error fetching global supply price updates:", error);
        return [];
    }
}
