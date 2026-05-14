"use server";

import { db } from "@workspace/db";
import { project } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function getProjectById(id: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return null;

        const result = await db.query.project.findFirst({
            where: eq(project.id, id),
            with: {
                config: true,
                levels: true,
                team: {
                    with: {
                        contact: true
                    }
                }
            }
        });

        if (!result) return null;

        const isAuthor = result.authorId === userId;
        const isCollaborator = result.team.some(t => (t.contact as { userId?: string })?.userId === userId);
        if (!isAuthor && !isCollaborator) return null;

        return {
            ...result,
            config: result.config?.[0] || null,
            levels: result.levels || [],
            team: result.team.map(t => ({
                ...t.contact,
                permissions: t.permissions
            }))
        };
    } catch (error) {
        console.error("Error fetching project by ID:", error);
        return null;
    }
}
