import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { authDb } from "@workspace/db/auth-db";


export const auth = betterAuth({
    database: drizzleAdapter(authDb, {
        provider: "pg"
    }),
    pages: {
        signIn: "/login",
        signUp: "/register",
        verifyEmail: "/verify-email",
        forgotPassword: "/forgot-password",
        resetPassword: "/reset-password",
    },
    trustedOrigins: process.env.NODE_ENV === "production" ? [
        process.env.APP1_URL,
        process.env.APP2_URL,
    ].filter((url): url is string => Boolean(url)) : [
        "http://localhost:3000",
        "http://localhost:3001"
    ],
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }
    }
})

export type Auth = ReturnType<typeof betterAuth>;
export type Session = Auth["$Infer"]["Session"]