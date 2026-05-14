'use server';

import { db, libraryFile } from '@workspace/db';
import { eq, and, desc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getCloudBimTemplates() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        const templates = await db.select().from(libraryFile)
            .where(and(eq(libraryFile.libraryType, 'bim_template'), eq(libraryFile.userId, userId)))
            .orderBy(desc(libraryFile.createdAt));

        return JSON.parse(JSON.stringify(templates));
    } catch (error) {
        console.error('Error fetching cloud templates:', error);
        return [];
    }
}