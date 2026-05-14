"use server";

import { db } from "@workspace/db";
import { notification, task, calendarEvent, user } from "@workspace/db/schema";
import { eq, and, gte, count } from "drizzle-orm";
import { auth } from '@clerk/nextjs/server';

export async function getInboxSummary() {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) return null;

        // Use the Clerk ID as the userId
        const userId = clerkId;

        const [unreadResult, pendingResult, eventsResult] = await Promise.all([
            db.select({ value: count() })
                .from(notification)
                .where(and(
                    eq(notification.userId, userId),
                    eq(notification.isRead, false)
                )),
            db.select({ value: count() })
                .from(task)
                .where(and(
                    eq(task.userId, userId),
                    eq(task.status, 'pendiente')
                )),
            db.select({ value: count() })
                .from(calendarEvent)
                .where(and(
                    eq(calendarEvent.userId, userId),
                    gte(calendarEvent.date, new Date())
                )),
        ]);

        const unreadNotifications = unreadResult[0]?.value ?? 0;
        const pendingTasks = pendingResult[0]?.value ?? 0;
        const upcomingEvents = eventsResult[0]?.value ?? 0;

        return {
            notifications: unreadNotifications,
            tasks: pendingTasks,
            events: upcomingEvents,
            hasUpdates: (unreadNotifications + pendingTasks + upcomingEvents) > 0,
            totalUnread: unreadNotifications + pendingTasks + upcomingEvents
        };

    } catch (error) {
        console.error("Error fetching inbox summary:", error);
        return null;
    }
}