"use server";

import { db } from "@workspace/db";
import { project } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function getProjects() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        return await db.select().from(project).where(eq(project.authorId, userId));
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}
