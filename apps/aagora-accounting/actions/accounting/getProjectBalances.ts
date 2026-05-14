'use server';

import { db, project } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';

export async function getProjectBalances() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return [];

        const projects = await db.query.project.findMany({
            where: eq(project.authorId, userId),
            with: {
                transactions: true,
                items: {
                    with: {
                        item: true,
                    },
                },
            },
        });

        return projects.map(p => {
            const income = p.transactions
                .filter(t => t.type === 'ingreso')
                .reduce((sum, t) => sum + t.amount, 0);

            const expense = p.transactions
                .filter(t => t.type === 'egreso')
                .reduce((sum, t) => sum + t.amount, 0);

            const budget = p.items.reduce(
                (sum, pi) => sum + pi.quantity * (pi.item?.total ?? 0),
                0
            );

            return {
                id: p.id,
                title: p.title,
                status: p.status,
                income,
                expense,
                balance: income - expense,
                budget,
                execution: budget > 0 ? (expense / budget) * 100 : 0,
            };
        });
    } catch (error) {
        console.error('Error fetching project balances:', error);
        return [];
    }
}
