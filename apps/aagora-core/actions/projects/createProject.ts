"use server";

import { db } from "@workspace/db";
import { project } from "@workspace/db/schema";
import { createProjectSchema, type CreateProjectInput } from "@workspace/db/validation";
import { getAuthUserId } from "@/lib/clerk-auth";
import { revalidatePath } from "next/cache";

export async function createProject(data: CreateProjectInput) {
    const parsed = createProjectSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "Unauthorized" };

        const [newProject] = await db.insert(project).values({
            ...parsed.data,
            authorId: userId,
        }).returning();

        revalidatePath('/projects');
        return { success: true, project: newProject };
    } catch (error: any) {
        console.error("[createProject] Error:", error);
        return { success: false, error: "Error al crear el proyecto" };
    }
}
