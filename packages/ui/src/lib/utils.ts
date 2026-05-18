import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type AppType = 'core' | 'accounting' | 'community' | 'construction' | 'design' | 'workspace';

/**
 * Dynamically resolves the URL of an application within the Aagora monorepo.
 * Handles:
 * 1. Explicitly configured environment variables (dashboard configs).
 * 2. Vercel dynamic preview branches (replaces the current app prefix in the hostname).
 * 3. Local development fallback ports.
 */
export function getAppUrl(app: AppType, customHost?: string): string {
  const envVarMap: Record<AppType, string | undefined> = {
    core: process.env.NEXT_PUBLIC_CORE_URL,
    accounting: process.env.NEXT_PUBLIC_ACCOUNTING_URL,
    community: process.env.NEXT_PUBLIC_COMMUNITY_URL,
    construction: process.env.NEXT_PUBLIC_CONSTRUCTION_URL,
    design: process.env.NEXT_PUBLIC_DESIGN_URL,
    workspace: process.env.NEXT_PUBLIC_WORKSPACE_URL,
  };

  const configuredUrl = envVarMap[app];
  const localPorts: Record<AppType, number> = {
    core: 3000,
    accounting: 3001,
    community: 3002,
    construction: 3003,
    design: 3004,
    workspace: 3005,
  };

  // Determine if we are in a production or Vercel deployment environment
  const isVercel = typeof process !== 'undefined' && (
    process.env.VERCEL === '1' || 
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || 
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
  );

  // If a valid URL is configured in environment variables and it's not a local fallback in production
  if (configuredUrl && !(isVercel && configuredUrl.includes('localhost'))) {
    return configuredUrl;
  }

  // Fallback to local development port if we are not in a Vercel/production environment
  if (!isVercel) {
    return `http://localhost:${localPorts[app]}`;
  }

  // Vercel deployment detection & dynamic routing
  let host = customHost || '';

  if (!host && typeof window !== 'undefined') {
    host = window.location.host;
  }

  if (!host && typeof process !== 'undefined') {
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      host = process.env.NEXT_PUBLIC_VERCEL_URL;
    } else if (process.env.VERCEL_URL) {
      host = process.env.VERCEL_URL;
    }
  }

  if (host) {
    // If the host is a vercel subdomain (e.g. aagora-workspace-git-main.vercel.app or aagora-workspace.vercel.app)
    if (host.includes('vercel.app')) {
      const apps: AppType[] = ['core', 'accounting', 'community', 'construction', 'design', 'workspace'];
      for (const currentApp of apps) {
        if (host.includes(`aagora-${currentApp}`)) {
          // Replace current app prefix with the target app prefix
          const targetHost = host.replace(`aagora-${currentApp}`, `aagora-${app}`);
          return `https://${targetHost}`;
        }
      }
    }
  }

  // Absolute fallback: Standard subdomain format for Vercel
  return `https://aagora-${app}.vercel.app`;
}
