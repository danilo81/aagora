import { redirect } from 'next/navigation';
import { db, project, projectContact, contact } from '@workspace/db';
import { eq, and, ilike } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export const MODULE_PERMISSION_MAP: Record<string, string | null> = {
    board: 'board',
    desing: 'design',
    construction: 'construction',
    operations: 'operations',
    shop: 'purchasing',
    warehouse: 'warehouses',
    accounting: 'accounting',
    documentation: 'documents',
    tasks: 'tasks',
    model: null,
    reportes: null,
};

export async function checkModuleAccess(projectId: string, routeSegment: string): Promise<void> {
    const permissionKey = MODULE_PERMISSION_MAP[routeSegment] ?? null;
    if (permissionKey === null) return;

    const userId = await getAuthUserId();
    if (!userId) redirect('/');

    const [projectRow] = await db
        .select({ authorId: project.authorId })
        .from(project)
        .where(eq(project.id, projectId))
        .limit(1);

    if (!projectRow) return;
    if (projectRow.authorId === userId) return;

    const [collabRow] = await db
        .select({ permissions: projectContact.permissions })
        .from(projectContact)
        .innerJoin(contact, eq(projectContact.contactId, contact.id))
        .where(
            and(
                eq(projectContact.projectId, projectId),
                eq(contact.status, 'active'),
                ilike(contact.type, 'personal'),
            )
        )
        .limit(1);

    if (!collabRow) redirect(`/project/${projectId}`);

    const perms = (collabRow.permissions ?? {}) as Record<string, { view?: boolean }>;
    if (!perms[permissionKey]?.view) {
        redirect(`/project/${projectId}?module_denied=${routeSegment}`);
    }
}
