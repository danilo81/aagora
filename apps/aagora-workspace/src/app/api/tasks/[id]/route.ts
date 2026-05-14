import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@workspace/db";
import { task } from "@workspace/db/schema";
import { updateTaskSchema } from "@workspace/db/validation";
import { and, eq } from "drizzle-orm";

// PATCH /api/tasks/:id — update task (ownership enforced)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const parsed = updateTaskSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Datos inválidos" }, { status: 400 });
    }

    const existing = await db.query.task.findFirst({ where: eq(task.id, id), columns: { userId: true } });
    if (!existing || existing.userId !== userId) {
        return NextResponse.json({ error: "No autorizado o tarea no encontrada" }, { status: 403 });
    }

    const { dueDate, ...rest } = parsed.data;
    const [updated] = await db.update(task)
        .set({
            ...rest,
            ...(dueDate !== undefined ? { dueDate: dueDate ? new Date(dueDate) : null } : {}),
            updatedAt: new Date(),
        })
        .where(and(eq(task.id, id), eq(task.userId, userId)))
        .returning();

    return NextResponse.json({ success: true, task: updated });
}

// DELETE /api/tasks/:id — delete task (ownership enforced)
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const existing = await db.query.task.findFirst({ where: eq(task.id, id), columns: { userId: true } });
    if (!existing || existing.userId !== userId) {
        return NextResponse.json({ error: "No autorizado o tarea no encontrada" }, { status: 403 });
    }

    await db.delete(task).where(and(eq(task.id, id), eq(task.userId, userId)));
    return NextResponse.json({ success: true });
}
