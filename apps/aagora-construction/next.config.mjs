/** @type {import('next').NextConfig} */

const clerkHosts = 'https://clerk.com https://*.clerk.com https://*.clerk.accounts.dev';
const r2Hosts = [
  'https://pub-0c4e991892914662ba0e3f09fb79757a.r2.dev',
  'https://pub-c09b07f1a7954c46b7f2a640146d8703.r2.dev',
].join(' ');

const csp = [
  "default-src 'self'",
  // 'wasm-unsafe-eval' is required by web-ifc / Three.js for WebAssembly execution.
  // This is narrower than 'unsafe-eval' — it only permits WASM, not arbitrary JS eval.
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' ${clerkHosts}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://img.clerk.com https://images.clerk.dev ${r2Hosts} https://images.unsplash.com`,
  "font-src 'self' data:",
  `connect-src 'self' ${clerkHosts} wss://*.clerk.com wss://*.clerk.accounts.dev https://*.r2.cloudflarestorage.com blob:`,
  `media-src 'self' ${r2Hosts}`,
  `frame-src 'self' ${clerkHosts}`,
  "frame-ancestors 'self'",
  // IFCWorker.js and Three.js use blob: Web Workers for IFC parsing off the main thread.
  "worker-src 'self' blob:",
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

const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      { hostname: "pub-0c4e991892914662ba0e3f09fb79757a.r2.dev" },
      { hostname: "pub-c09b07f1a7954c46b7f2a640146d8703.r2.dev" },
      { hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
if (process.env.NODE_ENV === 'development') {
  initOpenNextCloudflareForDev();
}

