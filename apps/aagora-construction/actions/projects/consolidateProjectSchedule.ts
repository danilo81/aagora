'use server';

import { db, project, projectConfig, projectItem, siteLog } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from "next/cache";
import { addDays } from "date-fns";
import { requireProjectAccess } from '@/lib/require-project-access';

export async function consolidateProjectSchedule(projectId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        const projectFetch = await db.query.project.findFirst({
            where: eq(project.id, projectId),
            with: {
                config: true,
                items: {
                    with: { item: true }
                }
            }
        });

        if (!projectFetch) return { success: false, error: "Proyecto no encontrado" };

        const projectStart = projectFetch.startDate ? new Date(projectFetch.startDate) : new Date();
        const configRecord = Array.isArray(projectFetch.config) ? projectFetch.config[0] : projectFetch.config;
        const workingDays = (configRecord as any)?.workingDaysSelection || [1, 2, 3, 4, 5, 6];
        const computations = projectFetch.items;

        const getDuration = (row: any) => {
            const performance = row.performance || row.item?.performance || 1;
            const baseDuration = Math.ceil(performance > 0 ? (row.quantity * performance) / 8 : 1);
            return Math.max(1, baseDuration + (row.extraDays || 0));
        };

        const addWorkingDaysHelper = (startDate: Date, duration: number) => {
            let date = new Date(startDate);
            while (!workingDays.includes(date.getDay())) {
                date = addDays(date, 1);
            }
            let daysAdded = 0;
            while (daysAdded < duration) {
                date = addDays(date, 1);
                if (workingDays.includes(date.getDay())) {
                    daysAdded++;
                }
            }
            return date;
        };

        const featureMap = new Map<string, { startAt: Date; duration: number }>();
        let defaultOffset = 0;

        const calculateDates = (row: any, visited = new Set<string>()): { startAt: Date; duration: number } => {
            if (featureMap.has(row.id)) return featureMap.get(row.id)!;

            if (visited.has(row.id)) {
                return { startAt: addWorkingDaysHelper(projectStart, defaultOffset), duration: getDuration(row) };
            }
            visited.add(row.id);

            let startAt: Date;
            if (row.predecessorId) {
                const predecessor = computations.find((c: any) => c.id === row.predecessorId);
                if (predecessor) {
                    const predData = calculateDates(predecessor, visited);
                    startAt = addWorkingDaysHelper(predData.startAt, predData.duration); // Finish-to-Start
                } else {
                    startAt = row.startDate ? new Date(row.startDate) : addWorkingDaysHelper(projectStart, defaultOffset);
                }
            } else if (row.startDate) {
                startAt = new Date(row.startDate);
            } else {
                startAt = addWorkingDaysHelper(projectStart, defaultOffset);
            }

            while (!workingDays.includes(startAt.getDay())) {
                startAt = addDays(startAt, 1);
            }

            const duration = getDuration(row);
            if (!row.predecessorId) {
                defaultOffset += Math.ceil(duration / 2);
            }

            const result = { startAt, duration };
            featureMap.set(row.id, result);
            return result;
        };

        const updates = computations.map(row => {
            const { startAt, duration } = calculateDates(row);
            return {
                id: row.id,
                consolidatedStartDate: startAt,
                consolidatedDays: duration
            };
        });

        for (const upd of updates) {
            await db.update(projectItem)
                .set({
                    consolidatedStartDate: upd.consolidatedStartDate,
                    consolidatedDays: upd.consolidatedDays
                } as any)
                .where(eq(projectItem.id, upd.id));
        }

        await db.update(project)
            .set({ consolidatedAt: new Date() } as any)
            .where(eq(project.id, projectId));

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: "REPROGRMACIÓN",
            content: "CRONOGRAMA CONSOLIDADO: Se ha establecido la línea base del proyecto.",
            date: new Date()
        });

        revalidatePath(`/projects/${projectId}/construction`);
        return { success: true };

    } catch (error: any) {
        console.error("Error consolidando proyecto:", error);
        return { success: false, error: error.message };
    }
}