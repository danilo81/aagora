'use server';

import { db, libraryFile, projectDocument, contactDocument, contact, user } from "@workspace/db";
import { eq, sum, and, isNotNull } from "drizzle-orm";
import { getAuthUserId } from "@/lib/clerk-auth";
import { currentUser } from "@clerk/nextjs/server";

export async function getStorageStats() {
    try {
        const clerkUserId = await getAuthUserId();
        if (!clerkUserId) return { success: false, error: 'No autorizado' };

        let limitBytes = 1024 * 1024 * 1024;
        const clerkUser = await currentUser();
        if (clerkUser?.primaryEmailAddress?.emailAddress) {
            const [dbUser] = await db
                .select({ storageLimit: user.storageLimit })
                .from(user)
                .where(eq(user.email, clerkUser.primaryEmailAddress.emailAddress))
                .limit(1);

            if (dbUser?.storageLimit) {
                const match = dbUser.storageLimit.match(/^(\d+(?:\.\d+)?)\s*([KMGT]B|B)$/i);
                if (match && match[1] && match[2]) {
                    const value = parseFloat(match[1]);
                    const unit = match[2].toUpperCase();
                    const multipliers: Record<string, number> = {
                        'B': 1, 'KB': 1024, 'MB': 1024 * 1024,
                        'GB': 1024 * 1024 * 1024, 'TB': 1024 * 1024 * 1024 * 1024,
                    };
                    limitBytes = value * (multipliers[unit] ?? limitBytes);
                }
            }
        }

        const [libraryFilesSum] = await db
            .select({ total: sum(libraryFile.size) })
            .from(libraryFile)
            .where(eq(libraryFile.userId, clerkUserId));

        const [projectDocsSum] = await db
            .select({ total: sum(projectDocument.size) })
            .from(projectDocument)
            .where(and(isNotNull(projectDocument.userId), eq(projectDocument.userId, clerkUserId)));

        const [contactDocsSum] = await db
            .select({ total: sum(contactDocument.size) })
            .from(contactDocument)
            .innerJoin(contact, eq(contactDocument.contactId, contact.id))
            .where(eq(contact.userId, clerkUserId));

        const totalUsed = Number(libraryFilesSum?.total ?? 0)
            + Number(projectDocsSum?.total ?? 0)
            + Number(contactDocsSum?.total ?? 0);

        return {
            success: true,
            used: totalUsed,
            total: limitBytes,
            percentage: Math.min(100, (totalUsed / limitBytes) * 100),
        };
    } catch (error) {
        console.error('Error fetching storage stats:', error);
        return { success: false, used: 0, total: 1024 * 1024 * 1024, percentage: 0 };
    }
}
