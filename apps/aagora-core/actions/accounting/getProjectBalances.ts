"use server";

import { db } from "@workspace/db";
import { project, projectTransaction } from "@workspace/db/schema";
import { sql, eq, inArray } from "drizzle-orm";
import { getAccessibleProjectIds } from "../projects/getAccessibleProjectIds";

export async function getProjectBalances() {
    try {
        const access = await getAccessibleProjectIds();
        if (!access || access.collabIds.length === 0) return [];

        const results = await db.select({
            title: project.title,
            status: project.status,
            income: sql<number>`COALESCE(SUM(CASE WHEN ${projectTransaction.type} = 'ingreso' THEN ${projectTransaction.amount} ELSE 0 END), 0)`,
            expense: sql<number>`COALESCE(SUM(CASE WHEN ${projectTransaction.type} = 'egreso' THEN ${projectTransaction.amount} ELSE 0 END), 0)`,
        })
        .from(project)
        .where(inArray(project.id, access.collabIds))
        .leftJoin(projectTransaction, eq(project.id, projectTransaction.projectId))
        .groupBy(project.id, project.title, project.status);

        return results.map(r => ({
            ...r,
            balance: Number(r.income) - Number(r.expense)
        }));
    } catch (error) {
        console.error("Error fetching project balances:", error);
        return [];
    }
}
