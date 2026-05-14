'use server';

import { db } from '@workspace/db';
import { calendarEvent, notification, project, task, contact, projectConfig, projectContact } from '@workspace/db/schema';
import { and, eq, desc, sql, gte } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

// --- Workspace Summary ---

export async function getUnifiedWorkspaceData() {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    try {
        const [events, tasks, notifications, projects] = await Promise.all([
            db.select().from(calendarEvent).where(eq(calendarEvent.userId, userId)).orderBy(desc(calendarEvent.date)),
            db.select().from(task).where(eq(task.userId, userId)).orderBy(desc(task.createdAt)),
            db.select().from(notification).where(eq(notification.userId, userId)).orderBy(desc(notification.createdAt)),
            db.select().from(project).where(eq(project.authorId, userId))
        ]);

        return {
            success: true,
            data: {
                events,
                tasks,
                notifications,
                projects
            }
        };
    } catch (error) {
        console.error("Error fetching workspace data:", error);
        return { success: false, error: "Failed to fetch data" };
    }
}

export async function getInboxSummary() {
    const { userId } = await auth();
    if (!userId) return { unreadCount: 0, totalCount: 0 };

    try {
        const [notifs, tasks] = await Promise.all([
            db.select().from(notification).where(and(eq(notification.userId, userId), eq(notification.isRead, false))),
            db.select().from(task).where(and(eq(task.userId, userId), sql`${task.status} != 'completado'`))
        ]);
        return { unreadCount: notifs.length, totalCount: tasks.length };
    } catch {
        return { unreadCount: 0, totalCount: 0 };
    }
}

// --- Tasks ---

export async function getTasks() {
    const { userId } = await auth();
    if (!userId) return [];
    return db.select().from(task).where(eq(task.userId, userId)).orderBy(desc(task.createdAt));
}

export async function createTask(data: { title: string; description?: string; priority?: string; projectId: string; assignee?: string; dueDate?: string; status?: string }) {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };
    try {
        const [created] = await db.insert(task).values({
            ...data,
            userId,
            dueDate: data.dueDate ? new Date(data.dueDate) : null
        }).returning();
        revalidatePath('/');
        return { success: true, task: created };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

export async function updateTask(id: string, data: { title?: string; description?: string; priority?: string; projectId?: string; assignee?: string; dueDate?: string; status?: string }) {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };
    try {
        const [updated] = await db.update(task)
            .set({
                ...data,
                dueDate: data.dueDate ? new Date(data.dueDate) : undefined
            })
            .where(and(eq(task.id, id), eq(task.userId, userId)))
            .returning();
        revalidatePath('/');
        return { success: true, task: updated };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

export async function deleteTask(id: string) {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };
    try {
        await db.delete(task).where(and(eq(task.id, id), eq(task.userId, userId)));
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

export async function updateTaskStatusKanban(id: string, status: string) {
    const { userId } = await auth();
    if (!userId) return { success: false };
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await db.update(task).set({ status: status as any }).where(and(eq(task.id, id), eq(task.userId, userId)));
        revalidatePath('/');
        return { success: true };
    } catch {
        return { success: false };
    }
}

// --- Projects ---

export async function getProjects() {
    const { userId } = await auth();
    if (!userId) return [];
    return db.select().from(project).where(eq(project.authorId, userId));
}

export async function getProjectById(id: string) {
    const { userId } = await auth();
    if (!userId) return null;
    const [p] = await db.select().from(project).where(eq(project.id, id));
    if (!p) return null;

    const [config] = await Promise.all([
        db.select().from(projectConfig).where(eq(projectConfig.projectId, id)).then(rows => rows[0])
    ]);

    return { ...p, config };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateProject(id: string, data: { title?: string; client?: string; location?: string; projectType?: string; area?: number; status?: string; imageUrl?: string; config?: any; levels?: any[] }) {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };
    try {
        await db.update(project).set(data).where(and(eq(project.id, id), eq(project.authorId, userId)));
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

export async function getMyProjectPermissions(projectId: string) {
    const { userId } = await auth();
    if (!userId) return { isAuthor: false, permissions: {} };
    const [p] = await db.select().from(project).where(eq(project.id, projectId));
    if (p?.authorId === userId) return { isAuthor: true, permissions: null };

    const [pc] = await db.select().from(projectContact).where(and(eq(projectContact.projectId, projectId), eq(projectContact.contactId, userId)));
    return { isAuthor: false, permissions: pc?.permissions || {} };
}

// --- Calendar ---

export async function getCalendarEventsDb() {
    const { userId } = await auth();
    if (!userId) return { success: false, events: [] };
    try {
        const events = await db.select().from(calendarEvent).where(eq(calendarEvent.userId, userId));
        return { success: true, events };
    } catch (error) {
        return { success: false, events: [], error: (error as Error).message };
    }
}

export async function getUpcomingEvents() {
    const { userId } = await auth();
    if (!userId) return [];
    // This calls the internal logic we established earlier
    return db.select().from(calendarEvent).where(and(eq(calendarEvent.userId, userId), gte(calendarEvent.date, new Date()))).limit(10);
}

export async function createCalendarEvent(data: { title: string; date: string; type: string; project?: string; description?: string }) {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };
    try {
        const [event] = await db.insert(calendarEvent).values({
            userId,
            title: data.title,
            date: new Date(data.date),
            type: data.type,
            project: data.project,
            description: data.description,
        }).returning();
        revalidatePath('/');
        return { success: true, event };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

export async function updateCalendarEvent(id: string, data: { title: string; date: string; type: string; project?: string; description?: string }) {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };
    try {
        const [event] = await db.update(calendarEvent)
            .set({
                title: data.title,
                date: new Date(data.date),
                type: data.type,
                project: data.project,
                description: data.description,
            })
            .where(and(eq(calendarEvent.id, id), eq(calendarEvent.userId, userId)))
            .returning();
        revalidatePath('/');
        return { success: true, event };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

export async function deleteCalendarEvent(id: string) {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };
    try {
        await db.delete(calendarEvent).where(and(eq(calendarEvent.id, id), eq(calendarEvent.userId, userId)));
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

// --- Contacts ---

export async function getContacts() {
    const { userId } = await auth();
    if (!userId) return [];
    return db.select().from(contact).where(eq(contact.userId, userId));
}

export async function addContactToProject(projectId: string, contactId: string) {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };
    try {
        await db.insert(projectContact).values({ projectId, contactId });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

export async function removeContactFromProject(projectId: string, contactId: string) {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };
    try {
        await db.delete(projectContact).where(and(eq(projectContact.projectId, projectId), eq(projectContact.contactId, contactId)));
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function inviteCollaborator(_projectId: string, _email: string) {
    // Logic for invitation (send email or create pending contact)
    return { success: true };
}

export async function updateProjectContactPermissions(projectId: string, contactId: string, permissions: Record<string, { view: boolean; edit: boolean }>) {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };
    try {
        await db.update(projectContact).set({ permissions }).where(and(eq(projectContact.projectId, projectId), eq(projectContact.contactId, contactId)));
        return { success: true };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

// --- Notifications ---

export async function getNotifications() {
    const { userId } = await auth();
    if (!userId) return [];
    return db.select().from(notification).where(eq(notification.userId, userId)).orderBy(desc(notification.createdAt));
}

export async function markAsRead(id: string) {
    const { userId } = await auth();
    if (!userId) return { success: false };
    await db.update(notification).set({ isRead: true }).where(and(eq(notification.id, id), eq(notification.userId, userId)));
    return { success: true };
}

export async function markAllAsRead() {
    const { userId } = await auth();
    if (!userId) return { success: false };
    await db.update(notification).set({ isRead: true }).where(eq(notification.userId, userId));
    return { success: true };
}

export async function deleteNotification(id: string) {
    const { userId } = await auth();
    if (!userId) return { success: false };
    await db.delete(notification).where(and(eq(notification.id, id), eq(notification.userId, userId)));
    return { success: true };
}
