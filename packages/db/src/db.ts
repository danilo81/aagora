import { drizzle } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import * as authSchema from "./auth-db/schema";
import * as relations from "./relations";

const fullSchema = { ...schema, ...authSchema, ...relations };

let _db: NeonHttpDatabase<typeof fullSchema> | null = null;

export const getDb = () => {
    if (_db) return _db;

    console.log("Initializing DB client. DATABASE_URL present:", !!process.env.DATABASE_URL);
    console.log("AUTH_DATABASE_URL present:", !!process.env.AUTH_DATABASE_URL);

    const raw = process.env.DATABASE_URL || process.env.AUTH_DATABASE_URL;
    if (!raw) {
        console.error("Auth database connection string not found in process.env. AUTH_DATABASE_URL:", process.env.AUTH_DATABASE_URL, "DATABASE_URL:", process.env.DATABASE_URL);
        console.error("Available environment variable keys:", Object.keys(process.env));
        throw new Error("Neither AUTH_DATABASE_URL nor DATABASE_URL environment variable is set. Please check your .env file.");
    }

    // neon-http uses HTTP, not TCP — strip channel_binding which is unsupported by the HTTP driver
    let connectionString = raw;
    try {
        const url = new URL(raw);
        url.searchParams.delete('channel_binding');
        connectionString = url.toString();
    } catch {
        // If URL parsing fails, fall back to raw string
    }

    _db = drizzle(connectionString, { schema: fullSchema });

    return _db;
};

const _dbProxy = new Proxy({} as NeonHttpDatabase<typeof fullSchema>, {
    get: (_, prop) => (getDb() as any)[prop]
});

export const db: NeonHttpDatabase<typeof fullSchema> = _dbProxy;
