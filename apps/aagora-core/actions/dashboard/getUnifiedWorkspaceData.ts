'use server';

import { getAuthUserId } from '@/lib/clerk-auth';
import { db } from "@workspace/db";
import { calendarEvent, task, notification, project } from "@workspace/db/schema";
import { eq, or, inArray, asc, desc } from "drizzle-orm";
import { getAccessibleProjectIds } from '../projects/getAccessibleProjectIds';

export async function getUnifiedWorkspaceData() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };

        const access = await getAccessibleProjectIds();
        const projectIds = access ? access.collabIds : [];

        const [events, tasks, notifications, projects] = await Promise.all([
            // Calendar events
            db.select()
                .from(calendarEvent)
                .where(eq(calendarEvent.userId, userId))
                .orderBy(asc(calendarEvent.date)),

            // Tasks with project title
            db.select({
                id: task.id,
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate,
                assignee: task.assignee,
                projectId: task.projectId,
                userId: task.userId,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
                projectName: project.title,
            })
            .from(task)
            .leftJoin(project, eq(task.projectId, project.id))
            .where(
                or(
                    eq(task.userId, userId),
                    projectIds.length > 0 ? inArray(task.projectId, projectIds) : undefined
                )
            )
            .orderBy(asc(task.dueDate)),

            // Notifications
            db.select()
                .from(notification)
                .where(eq(notification.userId, userId))
                .orderBy(desc(notification.createdAt))
                .limit(50),

            // Projects
            db.select({ id: project.id, title: project.title })
                .from(project)
                .where(
                    or(
                        eq(project.authorId, userId),
                        projectIds.length > 0 ? inArray(project.id, projectIds) : undefined
                    )
                ),
        ]);

        return {
            success: true,
            data: {
                events: JSON.parse(JSON.stringify(events)),
                tasks: JSON.parse(JSON.stringify(tasks)),
                notifications: JSON.parse(JSON.stringify(notifications)),
                projects: JSON.parse(JSON.stringify(projects))
            }
        };
    } catch (error: any) {
        console.error('Error fetching workspace data:', error);
        return { success: false, error: "Error interno del servidor" };
    }
}