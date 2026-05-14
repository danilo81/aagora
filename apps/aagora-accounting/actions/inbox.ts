/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { db } from "@workspace/db";
import { notification, task, calendarEvent } from "@workspace/db/schema";
import { createTaskSchema, updateTaskSchema, type CreateTaskInput, type UpdateTaskInput } from "@workspace/db/validation";
import { eq, desc, and, ne } from "drizzle-orm";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function getNotifications() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];
        return await db.select()
            .from(notification)
            .where(eq(notification.userId, userId))
            .orderBy(desc(notification.createdAt))
            .limit(50);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
}

export async function markAsRead(id: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };
        await db.update(notification)
            .set({ isRead: true })
            .where(and(eq(notification.id, id), eq(notification.userId, userId)));
        return { success: true };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteNotification(id: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };
        await db.delete(notification)
            .where(and(eq(notification.id, id), eq(notification.userId, userId)));
        return { success: true };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getTasks() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];
        return await db.select().from(task)
            .where(eq(task.userId, userId))
            .orderBy(desc(task.createdAt));
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
}

export async function createTask(data: CreateTaskInput) {
    const parsed = createTaskSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };
        await db.insert(task).values({
            title: parsed.data.title,
            description: parsed.data.description,
            status: parsed.data.status,
            priority: parsed.data.priority,
            projectId: parsed.data.projectId,
            assignee: parsed.data.assignee,
            userId: userId,
            dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        return { success: true };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateTask(id: string, data: UpdateTaskInput) {
    const parsed = updateTaskSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };
        const existing = await db.query.task.findFirst({ where: eq(task.id, id), columns: { userId: true } });
        if (!existing || existing.userId !== userId) return { success: false, error: 'No tienes permisos para modificar esta tarea.' };
        await db.update(task)
            .set({
                ...parsed.data,
                dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : undefined,
                updatedAt: new Date(),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            .where(and(eq(task.id, id), eq(task.userId, userId)));
        return { success: true };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteTask(id: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: 'No autorizado' };
        const existing = await db.query.task.findFirst({ where: eq(task.id, id), columns: { userId: true } });
        if (!existing || existing.userId !== userId) return { success: false, error: 'No tienes permisos.' };
        await db.delete(task).where(and(eq(task.id, id), eq(task.userId, userId)));
        return { success: true };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getUpcomingEvents() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];
        return await db.select()
            .from(calendarEvent)
            .where(eq(calendarEvent.userId, userId))
            .orderBy(desc(calendarEvent.date))
            .limit(10);
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

export async function getInboxSummary() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { hasUpdates: false, totalUnread: 0, notificationsCount: 0, tasksCount: 0 };
        const [notificationsData, tasksData] = await Promise.all([
            db.select().from(notification).where(and(eq(notification.userId, userId), eq(notification.isRead, false))),
            db.select().from(task).where(and(eq(task.userId, userId), ne(task.status, 'completado')))
        ]);
        return {
            hasUpdates: notificationsData.length > 0 || tasksData.length > 0,
            totalUnread: notificationsData.length + tasksData.length,
            notificationsCount: notificationsData.length,
            tasksCount: tasksData.length
        };
    } catch (error) {
        return { hasUpdates: false, totalUnread: 0, notificationsCount: 0, tasksCount: 0 };
    }
}
