"use server";

import { db } from "@workspace/db";
import { fixedAsset } from "@workspace/db/schema";
import { desc } from "drizzle-orm";

export async function getAssets() {
    try {
        const rows = await db.select().from(fixedAsset).orderBy(desc(fixedAsset.createdAt)).limit(50);
        return rows.map((a) => ({
            ...a,
            brand: a.brand ?? undefined,
            model: a.model ?? undefined,
            serialNumber: a.serialNumber ?? undefined,
            location: a.location ?? undefined,
            userId: a.userId ?? undefined,
            projectId: a.projectId ?? undefined,
            authorId: a.authorId ?? undefined,
            purchaseDate: a.purchaseDate.toISOString().slice(0, 10),
        }));
    } catch (error) {
        console.error("Error fetching assets:", error);
        return [];
    }
}
