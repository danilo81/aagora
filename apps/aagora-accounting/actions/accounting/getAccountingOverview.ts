'use server';

import { db, project, projectTransaction } from '@workspace/db';
import { eq, inArray, desc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getAccountingOverview() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return null;

        const userProjects = await db
            .select({ id: project.id, title: project.title })
            .from(project)
            .where(eq(project.authorId, userId));

        if (userProjects.length === 0) {
            return { totalIncome: 0, totalExpense: 0, balance: 0, transactionCount: 0, recentTransactions: [] };
        }

        const projectIds = userProjects.map(p => p.id);
        const titleMap = new Map(userProjects.map(p => [p.id, p.title]));

        const transactions = await db
            .select()
            .from(projectTransaction)
            .where(inArray(projectTransaction.projectId, projectIds))
            .orderBy(desc(projectTransaction.date));

        const totalIncome = transactions
            .filter(t => t.type === 'ingreso')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
            .filter(t => t.type === 'egreso')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            transactionCount: transactions.length,
            recentTransactions: transactions.slice(0, 8).map(t => ({
                id: t.id,
                date: t.date.toISOString(),
                type: t.type,
                category: t.category,
                description: t.description,
                amount: t.amount,
                projectName: titleMap.get(t.projectId) ?? '—',
            })),
        };
    } catch (error) {
        console.error('Error fetching accounting overview:', error);
        return null;
    }
}
