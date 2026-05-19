/**
 * Rate limiter usando Cloudflare Workers KV.
 *
 * Implementa una ventana deslizante simple sin dependencias externas.
 * KV es eventual-consistent, lo que es aceptable para rate-limiting de borde
 * (no necesita exactitud perfecta, solo protección contra abuso).
 *
 * Configuración KV requerida en wrangler.jsonc:
 *   { "binding": "RATE_LIMIT_KV", "id": "<KV_NAMESPACE_ID>" }
 *
 * En desarrollo local (sin KV binding):
 *   La función devuelve { success: true } siempre → rate limiting desactivado.
 */

export interface RateLimitKV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const WINDOW_SECONDS = 10;
const MAX_REQUESTS = 20;

/**
 * Verifica y registra un hit de rate-limiting para la IP dada.
 * Usa el namespace KV `kv` para almacenar contadores con TTL automático.
 */
export async function checkRateLimit(
  kv: RateLimitKV | undefined | null,
  ip: string,
): Promise<RateLimitResult> {
  // Sin binding KV → rate limiting desactivado (dev local)
  if (!kv) {
    return { success: true, limit: MAX_REQUESTS, remaining: MAX_REQUESTS, reset: 0 };
  }

  const window = Math.floor(Date.now() / (WINDOW_SECONDS * 1000));
  const key = `rl:${ip}:${window}`;
  const reset = (window + 1) * WINDOW_SECONDS * 1000;

  try {
    const raw = await kv.get(key);
    const count = raw ? parseInt(raw, 10) : 0;

    if (count >= MAX_REQUESTS) {
      return {
        success: false,
        limit: MAX_REQUESTS,
        remaining: 0,
        reset,
      };
    }

    // Incrementar contador, TTL = ventana + 1s de margen
    await kv.put(key, String(count + 1), { expirationTtl: WINDOW_SECONDS + 1 });

    return {
      success: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS - count - 1,
      reset,
    };
  } catch {
    // Si KV falla, dejamos pasar (fail-open) para no bloquear usuarios legítimos
    return { success: true, limit: MAX_REQUESTS, remaining: MAX_REQUESTS, reset };
  }
}
