import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
	// Descomenta para habilitar caché incremental con R2 (recomendado para producción):
	// incrementalCache: r2IncrementalCache,
});
