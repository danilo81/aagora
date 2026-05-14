'use server';

import { db, project, projectTransaction } from '@workspace/db';
import { eq, and, sql } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getGlobalFinancialStats() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { totalIncome: 0, totalExpense: 0, netBalance: 0 };

        // Get all projects where user is author
        const userProjects = await db.select({ id: project.id })
            .from(project)
            .where(and(eq(project.authorId, userId), eq(project.status, 'activo')));
        const projectIds = userProjects.map(p => p.id);

        if (projectIds.length === 0) return { totalIncome: 0, totalExpense: 0, netBalance: 0 };

        const transactions = await db.select({ amount: projectTransaction.amount, type: projectTransaction.type })
            .from(projectTransaction)
            .where(sql`${projectTransaction.projectId} = ANY(${projectIds})`);

        const totalIncome = transactions.filter(t => t.type === 'ingreso').reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = transactions.filter(t => t.type === 'egreso').reduce((sum, t) => sum + t.amount, 0);
        return { totalIncome, totalExpense, netBalance: totalIncome - totalExpense };
    } catch (error) { return { totalIncome: 0, totalExpense: 0, netBalance: 0 }; }
}