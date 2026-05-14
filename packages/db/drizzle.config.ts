import { defineConfig } from "drizzle-kit";
import * as fs from "fs";
import * as path from "path";

// Load .env file manually since drizzle-kit CLI doesn't auto-load it
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match && match[1] && match[2]) {
            process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
        }
    }
}

export default defineConfig({
    schema: ["./src/schema.ts", "./src/auth-db/schema.ts"],
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
