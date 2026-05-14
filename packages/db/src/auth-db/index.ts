import { drizzle } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema.js";


let _authDb: NeonHttpDatabase<typeof schema> | null = null;

export const getAuthDb = () => {
    if (_authDb) return _authDb;

    const connectionString = process.env.AUTH_DATABASE_URL || process.env.DATABASE_URL;
    if (!connectionString) {
        console.error("Auth database connection string not found in process.env. AUTH_DATABASE_URL:", process.env.AUTH_DATABASE_URL, "DATABASE_URL:", process.env.DATABASE_URL);
        throw new Error("Neither AUTH_DATABASE_URL nor DATABASE_URL environment variable is set. Please check your .env file.");
    }

    _authDb = drizzle(connectionString, { schema })

    return _authDb
}

export const authDb = new Proxy({} as NeonHttpDatabase<typeof schema>, {
    get: (_, prop) => (getAuthDb() as any)[prop]
})