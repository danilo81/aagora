"use server";

import { getAuthUserId } from "@/lib/clerk-auth";
import { db } from "@workspace/db";
import { project, projectContact } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";

export async function getMyProjectPermissions(projectId: string) {
    const userId = await getAuthUserId();
    if (!userId) return { isAuthor: false, permissions: {} };

    try {
        const p = await db.query.project.findFirst({
            where: eq(project.id, projectId)
        });

        if (!p) return { isAuthor: false, permissions: {} };

        const isAuthor = p.authorId === userId;
        const contact = await db.query.projectContact.findFirst({
            where: and(
                eq(projectContact.projectId, projectId),
                eq(projectContact.contactId, userId)
            )
        });

        return {
            isAuthor,
            permissions: (contact?.permissions as Record<string, unknown>) || {}
        };
    } catch (error) {
        console.error("Error fetching permissions:", error);
        return { isAuthor: false, permissions: {} };
    }
}
