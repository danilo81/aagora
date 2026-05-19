// @workspace/auth has been deprecated.
// Authentication is handled exclusively by Clerk (@clerk/nextjs / @clerk/backend).
// This stub keeps existing imports from breaking during migration.
// Delete the auth package from pnpm-workspace.yaml once all references are removed.

export const auth = null;
export type Auth = never;
export type Session = never;