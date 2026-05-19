// Cloudflare Worker environment bindings
export interface Env {
  DATABASE_URL: string;
  CLERK_SECRET_KEY: string;
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  // Secret compartido para validar llamadas internas via Service Binding
  INTERNAL_SECRET?: string;
}
