"use server";

import { db } from "@workspace/db";
import { project, projectTransaction } from "@workspace/db/schema";
import { eq, inArray, sql } from "drizzle-orm";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function getGlobalFinancialStats() {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { totalIncome: 0, totalExpense: 0, netBalance: 0, activeProjects: 0 };

        const userProjects = await db.select({ id: project.id }).from(project).where(eq(project.authorId, userId));
        if (userProjects.length === 0) return { totalIncome: 0, totalExpense: 0, netBalance: 0, activeProjects: 0 };

        const projectIds = userProjects.map(p => p.id);

        const stats = await db.select({
            totalIncome: sql<number>`sum(case when type = 'ingreso' then amount else 0 end)`,
            totalExpense: sql<number>`sum(case when type = 'egreso' then amount else 0 end)`,
        }).from(projectTransaction).where(inArray(projectTransaction.projectId, projectIds));

        const income = stats[0]?.totalIncome || 0;
        const expense = stats[0]?.totalExpense || 0;

        return {
            totalIncome: income,
            totalExpense: expense,
            netBalance: income - expense,
            activeProjects: 0, // This would need another query or be passed in
        };
    } catch (error) {
        console.error("Error fetching global financial stats:", error);
        return {
            totalIncome: 0,
            totalExpense: 0,
            netBalance: 0,
            activeProjects: 0,
        };
    }
}
