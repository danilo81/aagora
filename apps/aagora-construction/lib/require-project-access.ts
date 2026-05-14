'use server';

import { db } from '@workspace/db';
import { project } from '@workspace/db/schema';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from './clerk-auth';

/**
 * Verifies the authenticated user owns the given project.
 * Returns the userId on success, null if unauthenticated or not the owner.
 */
export async function requireProjectAccess(projectId: string): Promise<string | null> {
    const userId = await getAuthUserId();
    if (!userId) return null;

    const [proj] = await db
        .select({ authorId: project.authorId })
        .from(project)
        .where(eq(project.id, projectId))
        .limit(1);

    if (!proj || proj.authorId !== userId) return null;
    return userId;
}
