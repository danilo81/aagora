"use server";

import { getAuthUserId } from "@/lib/clerk-auth";
import { db } from "@workspace/db";
import { project, projectConfig, level } from "@workspace/db/schema";
import { and, eq } from "drizzle-orm";

export async function updateProject(projectId: string, data: {
    title?: string;
    description?: string;
    client?: string;
    location?: string;
    projectType?: string;
    area?: number;
    status?: string;
    startDate?: Date | string | null;
    config?: Record<string, unknown>;
    levels?: Array<{ id?: string; name: string }>;
}) {
    const userId = await getAuthUserId();
    if (!userId) return { success: false, error: "No autorizado" };

    try {
        const existing = await db.query.project.findFirst({ where: eq(project.id, projectId), columns: { authorId: true } });
        if (!existing || existing.authorId !== userId) return { success: false, error: "No tienes permisos para modificar este proyecto." };

        const { config, levels, ...projectFields } = data;

        if (Object.keys(projectFields).length > 0) {
            const updateData: Record<string, unknown> = { ...projectFields, updatedAt: new Date() };
            if (updateData.startDate && typeof updateData.startDate === 'string') {
                updateData.startDate = new Date(updateData.startDate);
            }
            await db.update(project)
                .set(updateData)
                .where(and(eq(project.id, projectId), eq(project.authorId, userId)));
        }

        if (config) {
            await db.update(projectConfig)
                .set(config)
                .where(eq(projectConfig.projectId, projectId));
        }

        if (levels) {
            await db.delete(level).where(eq(level.projectId, projectId));
            if (levels.length > 0) {
                await db.insert(level).values(
                    levels.map((l) => ({ name: l.name, projectId }))
                );
            }
        }

        return { success: true };
    } catch (error: unknown) {
        console.error("Error updating project:", error);
        return { success: false, error: "Error al actualizar proyecto" };
    }
}
