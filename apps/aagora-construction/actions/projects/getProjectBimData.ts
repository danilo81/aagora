'use server';

import { db, bimBranch } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';

export async function getProjectBimData(projectId: string) {
    try {
        const branches = await db.query.bimBranch.findMany({
            where: eq(bimBranch.projectId, projectId),
            with: { versions: true },
            orderBy: [desc(bimBranch.isMain)]
        });

        if (branches.length === 0) {
            const [main] = await db.insert(bimBranch).values({
                projectId,
                name: 'main',
                isMain: true
            }).returning();
            return { success: true, branches: [JSON.parse(JSON.stringify({ ...main, versions: [] }))] };
        }

        return { success: true, branches: JSON.parse(JSON.stringify(branches)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}