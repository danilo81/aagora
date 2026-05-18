import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db, project, projectContact, contact } from '@workspace/db';
import { eq, and, ilike } from 'drizzle-orm';
import { ProjectPermissionsProvider, PermissionsMap } from '../../../contexts/project-permissions-context';
import { getAuthUserId } from '@/lib/clerk-auth';
import { Navbar } from '@/components/navbar';

const RESERVED = [
    'reportes', 'construction', 'operations', 'documentation',
    'tasks', 'model', 'board', 'desing', 'shop', 'warehouse',
    'accounting', 'undefined', 'null'
];

export default async function ProjectIdLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    if (!id || RESERVED.includes(id)) {
        return <>{children}</>;
    }

    const { userId } = await auth();
    if (!userId) redirect('/');

    const dbUserId = await getAuthUserId();

    const [projectRow] = await db
        .select({ id: project.id, authorId: project.authorId })
        .from(project)
        .where(eq(project.id, id))
        .limit(1);

    if (!projectRow) {
        return (
            <ProjectPermissionsProvider isAuthor={false} permissions={{}}>
                {children}
            </ProjectPermissionsProvider>
        );
    }

    if (projectRow.authorId === dbUserId) {
        return (
            <ProjectPermissionsProvider isAuthor={true} permissions={{}}>
                {children}
            </ProjectPermissionsProvider>
        );
    }

    const [collabRow] = await db
        .select({ permissions: projectContact.permissions })
        .from(projectContact)
        .innerJoin(contact, eq(projectContact.contactId, contact.id))
        .where(
            and(
                eq(projectContact.projectId, id),
                eq(contact.status, 'active'),
                ilike(contact.type, 'personal'),
            )
        )
        .limit(1);

    if (!collabRow) redirect('/project?access=denied');

    const permissions = ((collabRow.permissions ?? {}) as unknown) as PermissionsMap;

    return (
        <ProjectPermissionsProvider isAuthor={false} permissions={permissions}>
            <Navbar />
            {children}
        </ProjectPermissionsProvider>
    );
}
