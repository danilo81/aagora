"use server";

import { db } from "@workspace/db";
import { contact } from "@workspace/db/schema";
import { desc, eq } from "drizzle-orm";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function getContacts() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        return await db.query.contact.findMany({
            where: eq(contact.userId, userId),
            orderBy: [desc(contact.createdAt)],
            limit: 50,
            with: { bankAccounts: true },
        });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return [];
    }
}
