import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@workspace/db";
import { notification } from "@workspace/db/schema";
import { and, eq } from "drizzle-orm";

// DELETE /api/notifications/:id — delete (ownership enforced in WHERE)
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await db.delete(notification)
        .where(and(eq(notification.id, id), eq(notification.userId, userId)));

    return NextResponse.json({ success: true });
}

// PATCH /api/notifications/:id — mark single notification as read
export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await db.update(notification)
        .set({ isRead: true })
        .where(and(eq(notification.id, id), eq(notification.userId, userId)));

    return NextResponse.json({ success: true });
}
