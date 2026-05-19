import { createClerkClient } from '@clerk/backend';
import type { Env } from './types';

/**
 * Extrae el userId del request.
 *
 * Soporta dos modos:
 * 1. Service Binding (llamada interna desde otro Worker CF):
 *    - Header X-User-Id con el userId ya verificado por el worker llamante
 *    - Header X-Internal-Secret que debe coincidir con env.INTERNAL_SECRET
 *
 * 2. HTTP externo (llamadas desde el browser):
 *    - Bearer token en Authorization → verifica con Clerk
 */
export async function getUserId(req: Request, env: Env): Promise<string | null> {
  // ── Modo 1: Service Binding (llamada interna) ─────────────────────────────
  const internalUserId = req.headers.get('X-User-Id');
  const internalSecret = req.headers.get('X-Internal-Secret');

  if (internalUserId && env.INTERNAL_SECRET && internalSecret === env.INTERNAL_SECRET) {
    return internalUserId;
  }

  // ── Modo 2: JWT externo (browser) ─────────────────────────────────────────
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) return null;

  try {
    const clerk = createClerkClient({ secretKey: env.CLERK_SECRET_KEY });
    const payload = await clerk.verifyToken(token);
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

/**
 * Respuesta JSON de error 401 estándar
 */
export function unauthorized(): Response {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}
