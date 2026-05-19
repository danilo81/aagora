import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { tasksRouter } from './routes/tasks';
import { calendarRouter } from './routes/calendar';
import { notificationsRouter } from './routes/notifications';
import type { Env } from './types';

const app = new Hono<{ Bindings: Env }>();

// CORS — permite llamadas desde apps hermanas y browser
app.use('*', cors({
  origin: (origin) => {
    // Permite orígenes conocidos del monorepo en desarrollo y producción
    const allowed = [
      'http://localhost:3000', // aagora-core dev
      'http://localhost:3003', // aagora-construction dev
      'http://localhost:3004', // aagora-accounting dev
      'http://localhost:3005', // workspace dev (self)
      'https://aagora-core.workers.dev',
      'https://aagora-construction.vercel.app',
    ];
    if (!origin || allowed.some(o => origin.startsWith(o))) return origin ?? '*';
    return null;
  },
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-User-Id', 'X-Internal-Secret'],
}));

// Health check
app.get('/health', (c) => c.json({ status: 'ok', service: 'aagora-workspace-api' }));

// Rutas de la API
app.route('/api/tasks', tasksRouter);
app.route('/api/calendar', calendarRouter);
app.route('/api/notifications', notificationsRouter);

// 404 catch-all
app.notFound((c) => c.json({ error: 'Not Found' }, 404));

export default app;
