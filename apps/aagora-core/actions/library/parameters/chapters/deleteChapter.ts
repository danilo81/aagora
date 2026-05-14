"use server"

import { db } from "@workspace/db";
import { chapter } from "@workspace/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function deleteChapter(id: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { error: "No autorizado" };

        const existing = await db.query.chapter.findFirst({ where: eq(chapter.id, id), columns: { userId: true } });
        if (!existing || existing.userId !== userId) return { error: "No tienes permisos para eliminar este capítulo." };

        await db.delete(chapter).where(and(eq(chapter.id, id), eq(chapter.userId, userId)));
        revalidatePath("/library/parameters/chapters");
        return { success: true };
    } catch (error) {
        console.error("Error deleting chapter:", error);
        return { error: "Failed to delete chapter" };
    }
}
