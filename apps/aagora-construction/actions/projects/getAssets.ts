"use server";

import { db, fixedAsset } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function getAssets() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        const rows = await db.select().from(fixedAsset)
            .where(eq(fixedAsset.userId, userId))
            .orderBy(desc(fixedAsset.createdAt))
            .limit(50);

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
