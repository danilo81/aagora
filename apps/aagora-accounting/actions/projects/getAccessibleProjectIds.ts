'use server';

import { getAuthUserId } from '@/lib/clerk-auth';

export async function getAccessibleProjectIds() {
    const userId = await getAuthUserId();
    if (!userId) return null;
    return { userId, collabIds: [] as string[] };
}
