'use server';

import { db, bimIssue } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

export async function createBimIssue(data: {
    projectId: string;
    elementId: string;
    elementName?: string;
    title: string;
    description: string;
}) {
    try {
        const userId = await getAuthUserId();

        const [issue] = await db.insert(bimIssue).values({
            projectId: data.projectId,
            elementId: data.elementId,
            elementName: data.elementName,
            title: data.title,
            description: data.description,
            status: 'pendiente',
            authorId: userId ?? null
        }).returning();

        revalidatePath(`/projects/${data.projectId}/model`);
        revalidatePath(`/projects/${data.projectId}/design`);

        return { success: true, issue };
    } catch (error: any) {
        console.error('Error creating BIM issue:', error);
        return { success: false, error: error.message };
    }
}

export async function getBimIssues(projectId: string) {
    try {
        const issues = await db.select().from(bimIssue)
            .where(eq(bimIssue.projectId, projectId))
            .orderBy(desc(bimIssue.createdAt));

        return { success: true, issues: JSON.parse(JSON.stringify(issues)) };
    } catch (error: any) {
        console.error('Error fetching BIM issues:', error);
        return { success: false, error: error.message };
    }
}

export async function updateBimIssueStatus(issueId: string, status: string) {
    try {
        const [issue] = await db.update(bimIssue)
            .set({ status })
            .where(eq(bimIssue.id, issueId))
            .returning();

        revalidatePath(`/projects/${issue.projectId}/model`);

        return { success: true, issue };
    } catch (error: any) {
        console.error('Error updating BIM issue status:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteBimIssue(issueId: string) {
    try {
        const [issue] = await db.delete(bimIssue)
            .where(eq(bimIssue.id, issueId))
            .returning();

        revalidatePath(`/projects/${issue.projectId}/model`);

        return { success: true };
    } catch (error: any) {
        console.error('Error deleting BIM issue:', error);
        return { success: false, error: error.message };
    }
}