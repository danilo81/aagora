"use server";

import { db } from "@workspace/db";
import { project } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function getAccessibleProjectIds() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return null;

        const projects = await db.select({ id: project.id }).from(project).where(eq(project.authorId, userId));
        return {
            userId,
            collabIds: projects.map(p => p.id)
        };
    } catch (error) {
        console.error("Error in getAccessibleProjectIds:", error);
        return null;
    }
}
