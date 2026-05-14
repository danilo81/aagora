'use server';

import { db } from '@workspace/db';
import { unit } from '@workspace/db/schema';
import { eq, asc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getUnits() {
    try {
        const currentUserId = await getAuthUserId();
        if (!currentUserId) return [];

        return await db
            .select()
            .from(unit)
            .where(eq(unit.userId, currentUserId))
            .orderBy(asc(unit.name));
    } catch (error) {
        console.error('Error fetching units:', error);
        return [];
    }
}