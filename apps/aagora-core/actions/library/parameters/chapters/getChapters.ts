"use server"

import { db } from "@workspace/db";
import { chapter } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function getChapters() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        const chapters = await db.select().from(chapter).where(eq(chapter.userId, userId));
        return chapters;
    } catch (error) {
        console.error("Error fetching chapters:", error);
        return [];
    }
}
