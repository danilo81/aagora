"use server";

import { db, contact } from "@workspace/db";
import { desc } from "drizzle-orm";

export async function getContacts() {
    try {
        return await db.select().from(contact).orderBy(desc(contact.createdAt)).limit(50);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return [];
    }
}
