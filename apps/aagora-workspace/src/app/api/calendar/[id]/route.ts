import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@workspace/db";
import { calendarEvent } from "@workspace/db/schema";
import { updateCalendarEventSchema } from "@workspace/db/validation";
import { and, eq } from "drizzle-orm";

// PATCH /api/calendar/:id — update event (ownership enforced)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const parsed = updateCalendarEventSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Datos inválidos" }, { status: 400 });
    }

    const [event] = await db.update(calendarEvent)
        .set({
            title: parsed.data.title,
            date: new Date(parsed.data.date),
            type: parsed.data.type,
            project: parsed.data.project ?? "",
            description: parsed.data.description ?? "",
        })
        .where(and(eq(calendarEvent.id, id), eq(calendarEvent.userId, userId)))
        .returning();

    if (!event) return NextResponse.json({ error: "Evento no encontrado o sin permisos" }, { status: 404 });
    return NextResponse.json({ success: true, event: JSON.parse(JSON.stringify(event)) });
}

// DELETE /api/calendar/:id — delete event (ownership enforced)
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await db.delete(calendarEvent)
        .where(and(eq(calendarEvent.id, id), eq(calendarEvent.userId, userId)));

    return NextResponse.json({ success: true });
}
