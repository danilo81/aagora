'use server';

import { db, project, projectTransaction } from '@workspace/db';
import { eq, and, inArray, desc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getGlobalReceivables() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return null;

        const userProjects = await db
            .select({ id: project.id, title: project.title, client: project.client })
            .from(project)
            .where(and(eq(project.authorId, userId), eq(project.status, 'activo')));

        if (userProjects.length === 0) {
            return { totalReceivable: 0, collectedThisMonth: 0, pendingCount: 0, items: [] };
        }

        const projectIds = userProjects.map(p => p.id);
        const projectMap = new Map(userProjects.map(p => [p.id, p]));

        const transactions = await db
            .select()
            .from(projectTransaction)
            .where(and(
                inArray(projectTransaction.projectId, projectIds),
                eq(projectTransaction.type, 'ingreso'),
            ))
            .orderBy(desc(projectTransaction.date));

        const totalReceivable = transactions.reduce((sum, t) => sum + t.amount, 0);
        const thisMonth = new Date().getMonth();
        const collectedThisMonth = transactions
            .filter(t => new Date(t.date).getMonth() === thisMonth)
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            totalReceivable,
            collectedThisMonth,
            pendingCount: transactions.length,
            items: transactions.map(t => {
                const proj = projectMap.get(t.projectId);
                return {
                    id: `REC-${t.id.slice(-4).toUpperCase()}`,
                    client: proj?.client || 'Cliente General',
                    project: proj?.title ?? '—',
                    amount: t.amount,
                    dueDate: t.date.toISOString().split('T')[0],
                    status: 'pending' as const,
                };
            }),
        };
    } catch (error) {
        console.error('Error fetching global receivables:', error);
        return null;
    }
}
