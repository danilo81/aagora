"use server"

import { db } from "@workspace/db";
import { chapter } from "@workspace/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function updateChapter(id: string, data: { name: string }) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { error: "No autorizado" };

        const existing = await db.query.chapter.findFirst({ where: eq(chapter.id, id), columns: { userId: true } });
        if (!existing || existing.userId !== userId) return { error: "No tienes permisos para modificar este capítulo." };

        await db.update(chapter)
            .set({ name: data.name, updatedAt: new Date() })
            .where(and(eq(chapter.id, id), eq(chapter.userId, userId)));
        revalidatePath("/library/parameters/chapters");
        return { success: true };
    } catch (error) {
        console.error("Error updating chapter:", error);
        return { error: "Failed to update chapter" };
    }
}
