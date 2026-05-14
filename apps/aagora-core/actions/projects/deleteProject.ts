"use server";

import { db } from "@workspace/db";
import { project } from "@workspace/db/schema";
import { getAuthUserId } from "@/lib/clerk-auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteProject(id: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "Unauthorized" };

        const existing = await db.query.project.findFirst({ where: eq(project.id, id), columns: { authorId: true } });
        if (!existing || existing.authorId !== userId) return { success: false, error: "No tienes permisos para eliminar este proyecto." };

        await db.delete(project).where(and(eq(project.id, id), eq(project.authorId, userId)));

        revalidatePath('/projects');
        return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("[deleteProject] Error:", error);
        return { success: false, error: "Error al eliminar el proyecto" };
    }
}
