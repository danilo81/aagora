'use server';

import { auth } from '@clerk/nextjs/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

/**
 * Cliente para llamar al aagora-workspace Hono Worker.
 *
 * En producción (Cloudflare Workers):
 *   Usa Service Binding (WORKSPACE_API) → 0ms latencia, sin red, sin token round-trip.
 *   Pasa el userId verificado via header X-User-Id + X-Internal-Secret.
 *
 * En desarrollo local:
 *   Cae back a HTTP hacia http://localhost:3005 con Bearer token de Clerk.
 *   (wrangler dev no expone Service Bindings entre workers locales por defecto)
 */

const DEV_BASE = process.env.NEXT_PUBLIC_WORKSPACE_URL ?? 'http://localhost:3005';

interface WorkerBinding {
  fetch(req: Request): Promise<Response>;
}

interface CloudflareEnv extends Record<string, unknown> {
  WORKSPACE_API?: WorkerBinding;
  INTERNAL_SECRET?: string;
}

/**
 * Obtiene la instancia del Service Binding si está disponible (producción CF),
 * o null si estamos en desarrollo local.
 */
async function getBinding(): Promise<{ binding: WorkerBinding; secret: string; userId: string } | null> {
  try {
    const ctx = (await getCloudflareContext()) as any;
    const binding = ctx.env?.WORKSPACE_API;
    const secret = ctx.env?.INTERNAL_SECRET;
    if (!binding || !secret) return null;

    const { userId } = await auth();
    if (!userId) return null;

    return { binding, secret, userId };
  } catch {
    // En dev local getCloudflareContext puede fallar → fallback HTTP
    return null;
  }
}

/**
 * Headers para llamada via Service Binding (sin token Clerk)
 */
function bindingHeaders(userId: string, secret: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'X-User-Id': userId,
    'X-Internal-Secret': secret,
  };
}

/**
 * Headers para llamada HTTP externa (fallback dev local)
 */
async function httpHeaders(): Promise<HeadersInit> {
  const { getToken } = await auth();
  const token = await getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  } as HeadersInit;
}

// ── GET ────────────────────────────────────────────────────────────────────────

export async function wGet<T = unknown>(path: string): Promise<T | null> {
  try {
    const b = await getBinding();
    if (b) {
      const res = await b.binding.fetch(
        new Request(`http://internal${path}`, {
          headers: bindingHeaders(b.userId, b.secret),
        }),
      );
      if (!res.ok) return null;
      return res.json() as Promise<T>;
    }

    // Fallback HTTP (desarrollo local)
    const res = await fetch(`${DEV_BASE}${path}`, { headers: await httpHeaders() });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

// ── POST ───────────────────────────────────────────────────────────────────────

export async function wPost<T = unknown>(path: string, body: unknown): Promise<T | null> {
  try {
    const b = await getBinding();
    if (b) {
      const res = await b.binding.fetch(
        new Request(`http://internal${path}`, {
          method: 'POST',
          headers: bindingHeaders(b.userId, b.secret),
          body: JSON.stringify(body),
        }),
      );
      if (!res.ok) return null;
      return res.json() as Promise<T>;
    }

    const res = await fetch(`${DEV_BASE}${path}`, {
      method: 'POST',
      headers: await httpHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

// ── PATCH ──────────────────────────────────────────────────────────────────────

export async function wPatch<T = unknown>(path: string, body?: unknown): Promise<T | null> {
  try {
    const b = await getBinding();
    if (b) {
      const res = await b.binding.fetch(
        new Request(`http://internal${path}`, {
          method: 'PATCH',
          headers: bindingHeaders(b.userId, b.secret),
          ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        }),
      );
      if (!res.ok) return null;
      return res.json() as Promise<T>;
    }

    const res = await fetch(`${DEV_BASE}${path}`, {
      method: 'PATCH',
      headers: await httpHeaders(),
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

// ── DELETE ─────────────────────────────────────────────────────────────────────

export async function wDelete<T = unknown>(path: string): Promise<T | null> {
  try {
    const b = await getBinding();
    if (b) {
      const res = await b.binding.fetch(
        new Request(`http://internal${path}`, {
          method: 'DELETE',
          headers: bindingHeaders(b.userId, b.secret),
        }),
      );
      if (!res.ok) return null;
      return res.json() as Promise<T>;
    }

    const res = await fetch(`${DEV_BASE}${path}`, {
      method: 'DELETE',
      headers: await httpHeaders(),
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}
