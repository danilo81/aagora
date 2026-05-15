import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@workspace/db";
import { calendarEvent } from "@workspace/db/schema";
import { createCalendarEventSchema } from "@workspace/db/validation";
import { asc, eq } from "drizzle-orm";

// GET /api/calendar — list the caller's calendar events from DB
export async function GET() {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const events = await db.select()
        .from(calendarEvent)
        .where(eq(calendarEvent.userId, userId))
        .orderBy(asc(calendarEvent.date));

    return NextResponse.json({ success: true, events: JSON.parse(JSON.stringify(events)) });
}

// POST /api/calendar — create a calendar event
export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = createCalendarEventSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Datos inválidos" }, { status: 400 });
    }

    try {
        const [event] = await db.insert(calendarEvent).values({
            title: parsed.data.title,
            date: new Date(parsed.data.date),
            type: parsed.data.type,
            project: parsed.data.project ?? "",
            description: parsed.data.description ?? "",
            userId,
        }).returning();

        return NextResponse.json({ success: true, event: JSON.parse(JSON.stringify(event)) }, { status: 201 });
    } catch (error: unknown) {
        console.error("Error creating calendar event:", error);
        return NextResponse.json({ error: (error as Error).message || "Error al insertar en DB" }, { status: 500 });
    }
}
export const runtime = 'edge';