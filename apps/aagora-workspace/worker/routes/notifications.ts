import { Hono } from 'hono';
import { db } from '@workspace/db';
import { notification, task } from '@workspace/db/schema';
import { and, desc, eq, ne } from 'drizzle-orm';
import { getUserId } from '../auth';
import type { Env } from '../types';

export const notificationsRouter = new Hono<{ Bindings: Env }>();

// GET /api/notifications — listar notificaciones del usuario
notificationsRouter.get('/', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const rows = await db.select()
    .from(notification)
    .where(eq(notification.userId, userId))
    .orderBy(desc(notification.createdAt))
    .limit(50);

  return c.json(rows);
});

// PATCH /api/notifications — marcar TODAS como leídas
notificationsRouter.patch('/', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  await db.update(notification)
    .set({ isRead: true })
    .where(and(eq(notification.userId, userId), eq(notification.isRead, false)));

  return c.json({ success: true });
});

// GET /api/notifications/summary — conteo de no leídas para el badge
notificationsRouter.get('/summary', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const [notificationsData, tasksData] = await Promise.all([
    db.select().from(notification)
      .where(and(eq(notification.userId, userId), eq(notification.isRead, false))),
    db.select().from(task)
      .where(and(eq(task.userId, userId), ne(task.status, 'completado'))),
  ]);

  return c.json({
    hasUpdates: notificationsData.length > 0 || tasksData.length > 0,
    totalUnread: notificationsData.length + tasksData.length,
    notificationsCount: notificationsData.length,
    tasksCount: tasksData.length,
  });
});

// PATCH /api/notifications/:id — marcar notificación individual como leída
notificationsRouter.patch('/:id', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const id = c.req.param('id');
  await db.update(notification)
    .set({ isRead: true })
    .where(and(eq(notification.id, id), eq(notification.userId, userId)));

  return c.json({ success: true });
});

// DELETE /api/notifications/:id — eliminar notificación (ownership enforced)
notificationsRouter.delete('/:id', async (c) => {
  const userId = await getUserId(c.req.raw, c.env);
  if (!userId) return c.json({ error: 'Unauthorized' }, 401);

  process.env.DATABASE_URL = c.env.DATABASE_URL;

  const id = c.req.param('id');
  await db.delete(notification)
    .where(and(eq(notification.id, id), eq(notification.userId, userId)));

  return c.json({ success: true });
});
