'use server';

import { db, user } from '@workspace/db';
import { project, projectContact, contact } from '@workspace/db/schema';
import { eq, or, inArray, ilike, desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/clerk-auth';

export async function getUserProjects(userId: string) {
    try {
        if (!(await requireAdmin())) return [];

        const foundUser = await db.query.user.findFirst({
            where: eq(user.id, userId),
            columns: { id: true, email: true },
        });
        if (!foundUser) return [];

        const collaborationLinks = await db
            .select({ projectId: projectContact.projectId })
            .from(projectContact)
            .innerJoin(contact, eq(projectContact.contactId, contact.id))
            .where(ilike(contact.email, foundUser.email));

        const collaborationIds = collaborationLinks.map(l => l.projectId);

        const conditions = collaborationIds.length
            ? or(eq(project.authorId, userId), inArray(project.id, collaborationIds))
            : eq(project.authorId, userId);

        const projects = await db
            .select()
            .from(project)
            .where(conditions)
            .orderBy(desc(project.createdAt));

        return projects.map(p => ({
            id: p.id,
            title: p.title,
            projectType: p.projectType ?? 'Construcción',
            status: p.status ?? 'Activo',
            imageUrl: p.imageUrl,
            authorId: p.authorId,
            createdAt: p.createdAt.toISOString(),
            updatedAt: p.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        return [];
    }
}