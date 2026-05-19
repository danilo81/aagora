import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

/**
 * R2 Incremental Cache activo.
 *
 * Requiere binding R2 en wrangler.jsonc:
 *   { "binding": "NEXT_CACHE_R2_BUCKET", "bucket_name": "aagora-next-cache" }
 */
export default defineCloudflareConfig({
	incrementalCache: r2IncrementalCache,
});
