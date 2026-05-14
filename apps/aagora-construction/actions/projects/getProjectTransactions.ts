'use server';

import { db, projectTransaction } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { requireProjectAccess } from '@/lib/require-project-access';

export async function getProjectTransactions(projectId: string) {
    try {
        const userId = await requireProjectAccess(projectId);
        if (!userId) return [];

        const transactions = await db.select().from(projectTransaction)
            .where(eq(projectTransaction.projectId, projectId))
            .orderBy(desc(projectTransaction.date));

        return transactions.map(t => ({
            ...t,
            date: t.date.toISOString().split('T')[0],
            createdAt: t.createdAt.toISOString(),
            updatedAt: t.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
}