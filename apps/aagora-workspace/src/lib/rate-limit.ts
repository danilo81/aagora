/**
 * Rate limiting para el Hono Worker de aagora-workspace.
 *
 * El Worker Hono usa Workers KV directamente a través del Env binding.
 * Este módulo exporta la misma función `checkRateLimit` del core
 * para uso futuro si se añade rate-limiting al Worker.
 *
 * Ver: apps/aagora-core/lib/rate-limit.ts para la implementación completa.
 *
 * Nota: Este archivo es un placeholder. El Hono Worker aplica rate-limiting
 * a nivel de middleware en worker/index.ts si se necesita.
 */

export { checkRateLimit } from '../../worker/../../../aagora-core/lib/rate-limit';
