import { Hono } from 'hono';
import { db } from '@workspace/db';
import { task, project } from '@workspace/db/schema';
import { createTaskSchema, updateTaskSchema } from '@workspace/db/validation';
import { and, eq, desc } from 'drizzle-orm';
import { getUserId } from '../auth';
import type { Env } from '../types';
import { z } from 'zod';

export const tasksRouter = new Hono<{ Bindings: Env }>();

const statusSchema = z.object({ status: z.string().min(1) });

// GET /api/tasks — listar tareas del usuario
tasksRouter.get('/', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  // Inicializar DB con DATABASE_URL del env del Worker
  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const rows = await db.select()
    .from(task)
    .where(eq(task.userId, userId))
    .orderBy(desc(task.createdAt))
    .limit(50);

  return c.json(rows);
});

// POST /api/tasks — crear tarea
tasksRouter.post('/', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const body = await c.req.json();
  const parsed = createTaskSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.issues[0]?.message ?? 'Datos inválidos' }, 400);
  }

  try {
    const [created] = await db.insert(task).values({
      ...parsed.data,
      userId,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
    }).returning();

    return c.json({ success: true, task: created }, 201);
  } catch (error) {
    console.error('Error creating task:', error);
    return c.json({ error: (error as Error).message || 'Error al insertar tarea' }, 500);
  }
});

// PATCH /api/tasks/:id — actualizar tarea (ownership enforced)
tasksRouter.patch('/:id', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = updateTaskSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.issues[0]?.message ?? 'Datos inválidos' }, 400);
  }

  const existing = await db.query.task.findFirst({
    where: eq(task.id, id),
    columns: { userId: true },
  });

  if (!existing || existing.userId !== userId) {
    return c.json({ error: 'No autorizado o tarea no encontrada' }, 403);
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

  return c.json({ success: true, task: updated });
});

// DELETE /api/tasks/:id — eliminar tarea (ownership enforced)
tasksRouter.delete('/:id', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const id = c.req.param('id');
  const existing = await db.query.task.findFirst({
    where: eq(task.id, id),
    columns: { userId: true },
  });

  if (!existing || existing.userId !== userId) {
    return c.json({ error: 'No autorizado o tarea no encontrada' }, 403);
  }

  await db.delete(task).where(and(eq(task.id, id), eq(task.userId, userId)));
  return c.json({ success: true });
});

// PATCH /api/tasks/:id/status — actualizar status Kanban (ownership enforced)
tasksRouter.patch('/:id/status', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'El campo status es requerido' }, 400);
  }

  const existing = await db.query.task.findFirst({
    where: eq(task.id, id),
    columns: { userId: true },
  });

  if (!existing || existing.userId !== userId) {
    return c.json({ error: 'No autorizado o tarea no encontrada' }, 403);
  }

  await db.update(task)
    .set({ status: parsed.data.status, updatedAt: new Date() })
    .where(and(eq(task.id, id), eq(task.userId, userId)));

  return c.json({ success: true });
});

// GET /api/tasks/with-projects — tareas enriquecidas con nombre de proyecto
tasksRouter.get('/with-projects', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const rows = await db.select({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    projectId: task.projectId,
    userId: task.userId,
    projectName: project.title,
  })
    .from(task)
    .leftJoin(project, eq(task.projectId, project.id))
    .where(eq(task.userId, userId))
    .orderBy(desc(task.createdAt))
    .limit(100);

  return c.json(rows);
});
