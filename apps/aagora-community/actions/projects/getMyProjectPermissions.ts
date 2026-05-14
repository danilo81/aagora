'use server';

import { db, project } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getMyProjectPermissions(projectId: string) {
    const userId = await getAuthUserId();
    if (!userId) return { isAuthor: false, permissions: {} };
    const [proj] = await db.select({ authorId: project.authorId })
        .from(project).where(eq(project.id, projectId)).limit(1);
    if (!proj) return { isAuthor: false, permissions: {} };
    if (proj.authorId === userId) return { isAuthor: true, permissions: null };
    return { isAuthor: false, permissions: {} as Record<string, { view: boolean; edit: boolean }> };
}
