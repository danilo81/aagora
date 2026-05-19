import { Hono } from 'hono';
import { db } from '@workspace/db';
import { calendarEvent, project, task } from '@workspace/db/schema';
import { createCalendarEventSchema, updateCalendarEventSchema } from '@workspace/db/validation';
import { and, asc, eq, gte, inArray, not } from 'drizzle-orm';
import { getUserId } from '../auth';
import type { Env } from '../types';

export const calendarRouter = new Hono<{ Bindings: Env }>();

// GET /api/calendar — listar eventos del usuario ordenados por fecha
calendarRouter.get('/', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const events = await db.select()
    .from(calendarEvent)
    .where(eq(calendarEvent.userId, userId))
    .orderBy(asc(calendarEvent.date));

  return c.json({ success: true, events: JSON.parse(JSON.stringify(events)) });
});

// POST /api/calendar — crear evento
calendarRouter.post('/', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const body = await c.req.json();
  const parsed = createCalendarEventSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.issues[0]?.message ?? 'Datos inválidos' }, 400);
  }

  try {
    const [event] = await db.insert(calendarEvent).values({
      title: parsed.data.title,
      date: new Date(parsed.data.date),
      type: parsed.data.type,
      project: parsed.data.project ?? '',
      description: parsed.data.description ?? '',
      userId,
    }).returning();

    return c.json({ success: true, event: JSON.parse(JSON.stringify(event)) }, 201);
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return c.json({ error: (error as Error).message || 'Error al insertar en DB' }, 500);
  }
});

// GET /api/calendar/upcoming — próximos eventos, tareas e hitos
calendarRouter.get('/upcoming', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [upcomingProjects, upcomingTasks, upcomingManualEvents] = await Promise.all([
    db.select()
      .from(project)
      .where(and(
        eq(project.authorId, userId),
        gte(project.startDate, today),
        inArray(project.status, ['activo', 'construccion']),
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
        not(eq(task.status, 'completado')),
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
        title: 'Inicio de Obra',
        project: p.title,
        date: p.startDate.toISOString().split('T')[0]!,
        type: 'hitos',
      });
    }
  }

  for (const t of upcomingTasks) {
    events.push({
      id: t.id,
      title: t.title,
      project: t.projectName ?? 'Sin Proyecto',
      date: t.date ? (new Date(t.date).toISOString().split('T')[0] ?? 'Sin fecha') : 'Sin fecha',
      type: 'tarea',
    });
  }

  for (const me of upcomingManualEvents) {
    events.push({
      id: me.id,
      title: me.title,
      project: me.project || 'Evento general',
      date: me.date ? (new Date(me.date).toISOString().split('T')[0] ?? 'Sin fecha') : 'Sin fecha',
      type: 'evento',
    });
  }

  const sorted = events
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 10);

  return c.json(sorted);
});

// PATCH /api/calendar/:id — actualizar evento (ownership enforced)
calendarRouter.patch('/:id', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = updateCalendarEventSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.issues[0]?.message ?? 'Datos inválidos' }, 400);
  }

  const [event] = await db.update(calendarEvent)
    .set({
      title: parsed.data.title,
      date: new Date(parsed.data.date),
      type: parsed.data.type,
      project: parsed.data.project ?? '',
      description: parsed.data.description ?? '',
    })
    .where(and(eq(calendarEvent.id, id), eq(calendarEvent.userId, userId)))
    .returning();

  if (!event) return c.json({ error: 'Evento no encontrado o sin permisos' }, 404);
  return c.json({ success: true, event: JSON.parse(JSON.stringify(event)) });
});

// DELETE /api/calendar/:id — eliminar evento (ownership enforced)
calendarRouter.delete('/:id', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const id = c.req.param('id');
  await db.delete(calendarEvent)
    .where(and(eq(calendarEvent.id, id), eq(calendarEvent.userId, userId)));

  return c.json({ success: true });
});
