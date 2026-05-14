import type { NextConfig } from "next";

const clerkHosts = 'https://clerk.com https://*.clerk.com https://*.clerk.accounts.dev';

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${clerkHosts}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://img.clerk.com https://images.clerk.dev`,
  "font-src 'self' data:",
  `connect-src 'self' ${clerkHosts} wss://*.clerk.com wss://*.clerk.accounts.dev`,
  `frame-src 'self' ${clerkHosts}`,
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  `form-action 'self' ${clerkHosts}`,
].join('; ');

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',    value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Content-Security-Policy',   value: csp },
];

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/db"],
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
