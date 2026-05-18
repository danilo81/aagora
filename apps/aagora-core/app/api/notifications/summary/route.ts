import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@workspace/db";
import { notification } from "@workspace/db/schema";
import { and, eq, ne } from "drizzle-orm";
import { task } from "@workspace/db/schema";

// GET /api/notifications/summary — unread counts for the inbox badge
export async function GET() {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [notificationsData, tasksData] = await Promise.all([
        db.select().from(notification).where(and(eq(notification.userId, userId), eq(notification.isRead, false))),
        db.select().from(task).where(and(eq(task.userId, userId), ne(task.status, "completado"))),
    ]);

    return NextResponse.json({
        hasUpdates: notificationsData.length > 0 || tasksData.length > 0,
        totalUnread: notificationsData.length + tasksData.length,
        notificationsCount: notificationsData.length,
        tasksCount: tasksData.length,
    });
}
export const runtime = 'edge';