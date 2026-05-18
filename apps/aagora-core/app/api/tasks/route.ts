import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@workspace/db";
import { task } from "@workspace/db/schema";
import { createTaskSchema } from "@workspace/db/validation";
import { desc, eq } from "drizzle-orm";

// GET /api/tasks — list the caller's tasks
export async function GET() {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const rows = await db.select()
        .from(task)
        .where(eq(task.userId, userId))
        .orderBy(desc(task.createdAt))
        .limit(50);

    return NextResponse.json(rows);
}

// POST /api/tasks — create a task
export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = createTaskSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Datos inválidos" }, { status: 400 });
    }

    try {
        const insertData = {
            ...parsed.data,
            userId,
            dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
        };

        const [created] = await db.insert(task).values(insertData).returning();
        return NextResponse.json({ success: true, task: created }, { status: 201 });
    } catch (error: unknown) {
        console.error("Error creating task:", error);
        return NextResponse.json({ error: (error as Error).message || "Error al insertar tarea en DB" }, { status: 500 });
    }
}
export const runtime = 'edge';