import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@workspace/db";
import { notification } from "@workspace/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";

// GET /api/notifications — list the caller's notifications
export async function GET() {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const rows = await db.select()
        .from(notification)
        .where(eq(notification.userId, userId))
        .orderBy(desc(notification.createdAt))
        .limit(50);

    return NextResponse.json(rows);
}

// PATCH /api/notifications — mark ALL unread as read
export async function PATCH() {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await db.update(notification)
        .set({ isRead: true })
        .where(and(eq(notification.userId, userId), eq(notification.isRead, false)));

    return NextResponse.json({ success: true });
}
