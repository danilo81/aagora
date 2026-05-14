"use server"

import { db } from "@workspace/db";
import { chapter } from "@workspace/db/schema";
import { revalidatePath } from "next/cache";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function createChapter(data: { name: string }) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { error: "No autorizado" };

        await db.insert(chapter).values({
            name: data.name,
            userId,
        });
        revalidatePath("/library/parameters/chapters");
        return { success: true };
    } catch (error) {
        console.error("Error creating chapter:", error);
        return { error: "Failed to create chapter" };
    }
}
