import { createAuthClient as createBetterAuthClient } from "better-auth/react";

export const createAuthClient = (): ReturnType<typeof createBetterAuthClient> => createBetterAuthClient();
export type SignIn = ReturnType<typeof createAuthClient>['signIn']