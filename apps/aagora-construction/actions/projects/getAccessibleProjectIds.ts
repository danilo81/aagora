'use server';

import { getAuthUserId } from '@/lib/clerk-auth';
// Note: getAccessibleProjectIds uses the Clerk userId directly as authorId
// Collaboration lookup is not trivial without user email — return just userId for own projects
export async function getAccessibleProjectIds() {
    const userId = await getAuthUserId();
    if (!userId) return null;
    // The Clerk userId is stored directly in project.authorId
    // Collaboration IDs require user email lookups which need the user table
    // Return userId and empty collabIds for now; callers filter by authorId directly
    return { userId, collabIds: [] as string[] };
}