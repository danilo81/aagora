import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@workspace/db";
import { calendarEvent, project, task } from "@workspace/db/schema";
import { and, eq, gte, inArray, not } from "drizzle-orm";

// GET /api/calendar/upcoming — upcoming tasks and project milestones for the caller
export async function GET() {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [upcomingProjects, upcomingTasks, upcomingManualEvents] = await Promise.all([
        db.select()
            .from(project)
            .where(and(
                eq(project.authorId, userId),
                gte(project.startDate, today),
                inArray(project.status, ["activo", "construccion"]),
            ))
            .limit(10),

        db.select({
            id: task.id,
            title: task.title,
            date: task.dueDate,
            projectName: project.title,
        })
            .from(task)
            .leftJoin(project, eq(task.projectId, project.id))
            .where(and(
                eq(task.userId, userId),
                gte(task.dueDate, today),
                not(eq(task.status, "completado")),
            ))
            .limit(10),

        db.select({
            id: calendarEvent.id,
            title: calendarEvent.title,
            date: calendarEvent.date,
            project: calendarEvent.project,
        })
            .from(calendarEvent)
            .where(and(
                eq(calendarEvent.userId, userId),
                gte(calendarEvent.date, today),
            ))
            .limit(10),
    ]);

    const events: { id: string; title: string; project: string; date: string; type: string }[] = [];

    for (const p of upcomingProjects) {
        if (p.startDate) {
            events.push({
                id: `start-${p.id}`,
                title: "Inicio de Obra",
                project: p.title,
                date: p.startDate.toISOString().split("T")[0]!,
                type: "hitos",
            });
        }
    }

    for (const t of upcomingTasks) {
        events.push({
            id: t.id,
            title: t.title,
            project: t.projectName ?? "Sin Proyecto",
            date: t.date ? (new Date(t.date).toISOString().split("T")[0] ?? "Sin fecha") : "Sin fecha",
            type: "tarea",
        });
    }

    for (const me of upcomingManualEvents) {
        events.push({
            id: me.id,
            title: me.title,
            project: me.project || "Evento general",
            date: me.date ? (new Date(me.date).toISOString().split("T")[0] ?? "Sin fecha") : "Sin fecha",
            type: "evento",
        });
    }

    const sorted = events
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 10);

    return NextResponse.json(sorted);
}
