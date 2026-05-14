import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@workspace/db";
import { task } from "@workspace/db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

const statusSchema = z.object({ status: z.string().min(1) });

// PATCH /api/tasks/:id/status — kanban status update (ownership enforced)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const parsed = statusSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: "El campo status es requerido" }, { status: 400 });
    }

    const existing = await db.query.task.findFirst({ where: eq(task.id, id), columns: { userId: true } });
    if (!existing || existing.userId !== userId) {
        return NextResponse.json({ error: "No autorizado o tarea no encontrada" }, { status: 403 });
    }

    await db.update(task)
        .set({ status: parsed.data.status, updatedAt: new Date() })
        .where(and(eq(task.id, id), eq(task.userId, userId)));

    return NextResponse.json({ success: true });
}
