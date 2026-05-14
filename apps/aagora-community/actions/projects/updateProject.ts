'use server';

import { db, project, projectConfig, level, projectItemLevelQuantity, warehouseMovement, inspectionRecord, siteLog } from '@workspace/db';
import { eq, inArray } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";
import { ProjectConfig } from "@/types/types";

export async function updateProject(id: string, data: {
    title?: string;
    description?: string;
    client?: string;
    location?: string;
    projectType?: string;
    area?: number;
    status?: string;
    imageUrl?: string;
    startDate?: string | null;
    config?: Partial<ProjectConfig>;
    levels?: { id?: string, name: string }[];
}) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const { config, levels, startDate, ...restProjectData } = data;
        const updateData: any = { ...restProjectData };

        if (startDate !== undefined) {
            if (startDate && startDate.trim() !== '') {
                const parsedDate = new Date(startDate);
                if (!isNaN(parsedDate.getTime())) updateData.startDate = parsedDate;
            } else {
                updateData.startDate = null;
            }
        }
        if (updateData.status) updateData.status = updateData.status.toLowerCase();

        await db.update(project).set(updateData).where(eq(project.id, id));

        if (config) {
            const { id: _confId, projectId: _projId, ...configData } = config;
            const [existing] = await db.select({ id: projectConfig.id })
                .from(projectConfig).where(eq(projectConfig.projectId, id)).limit(1);
            if (existing) {
                await db.update(projectConfig).set(configData as any).where(eq(projectConfig.projectId, id));
            } else {
                await db.insert(projectConfig).values({ projectId: id, ...configData as any });
            }
        }

        if (levels) {
            const newLevelIds = levels.map(l => l.id).filter(Boolean) as string[];
            const allLevels = await db.select({ id: level.id }).from(level).where(eq(level.projectId, id));
            const levelIdsToDelete = allLevels.map(l => l.id).filter(lid => !newLevelIds.includes(lid));

            if (levelIdsToDelete.length > 0) {
                await db.delete(projectItemLevelQuantity)
                    .where(inArray(projectItemLevelQuantity.levelId, levelIdsToDelete));
                await db.update(warehouseMovement)
                    .set({ levelId: null })
                    .where(inArray(warehouseMovement.levelId, levelIdsToDelete));
                await db.update(inspectionRecord)
                    .set({ levelId: null })
                    .where(inArray(inspectionRecord.levelId, levelIdsToDelete));
                await db.delete(level).where(inArray(level.id, levelIdsToDelete));
            }

            for (const lvl of levels) {
                if (lvl.id) {
                    await db.update(level).set({ name: lvl.name }).where(eq(level.id, lvl.id));
                } else {
                    await db.insert(level).values({ name: lvl.name, projectId: id });
                }
            }
        }

        await db.insert(siteLog).values({
            projectId: id,
            authorId: userId,
            type: 'info',
            content: `CONFIGURACIÓN ACTUALIZADA: Se modificaron los parámetros generales o la estructura del proyecto.`,
            date: new Date(),
        }).catch(() => null);

        revalidatePath('/projects');
        revalidatePath(`/projects/${id}`);
        return { success: true };
    } catch (error: any) {
        console.error("Server Action Update Error:", error);
        return { success: false, error: "Fallo técnico al actualizar el proyecto." };
    }
}
