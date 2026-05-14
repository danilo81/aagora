'use server';

import { db } from "@workspace/db";
import { project, projectItem, constructionItem } from "@workspace/db/schema";
import { eq, or, inArray, asc } from "drizzle-orm";
import { getAccessibleProjectIds } from '@/actions/projects/getAccessibleProjectIds';

export async function getCalendarEvents() {
    try {
        const access = await getAccessibleProjectIds();
        if (!access) return { success: false, error: 'Not authorized' };

        // Get active projects the user has access to
        const projects = await db.select()
            .from(project)
            .where(
                eq(project.status, 'activo')
            )
            .orderBy(asc(project.startDate));

        const events = [];

        for (const p of projects) {
            if (!p.startDate) continue;

            let currentTaskDate = new Date(p.startDate);

            events.push({
                date: p.startDate.toISOString().split('T')[0],
                title: `Inicio - ${p.title}`,
                type: 'milestone',
                projectId: p.id
            });

            // Get project items with their construction item details
            const items = await db.select({
                quantity: projectItem.quantity,
                performance: constructionItem.performance,
                description: constructionItem.description,
            })
            .from(projectItem)
            .innerJoin(constructionItem, eq(projectItem.itemId, constructionItem.id))
            .where(eq(projectItem.projectId, p.id));

            for (const item of items) {
                const performance = item.performance;
                const quantity = item.quantity;

                if (!performance || !quantity) continue;

                const durationDays = Math.ceil(quantity / performance);
                const startDate = new Date(currentTaskDate);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + durationDays - 1);

                events.push({
                    date: startDate.toISOString().split('T')[0],
                    endDate: endDate.toISOString().split('T')[0],
                    title: `${p.title}: ${item.description}`,
                    type: 'task',
                    projectId: p.id
                });

                currentTaskDate.setDate(endDate.getDate() + 1);
            }
        }

        return { success: true, events: JSON.parse(JSON.stringify(events)) };

    } catch (error: any) {
        console.error("Error fetching calendar events:", error);
        return { success: false, error: error.message };
    }
}