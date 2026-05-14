"use server";

import { db } from "@workspace/db";
import { inspectionRecord, project, projectItem, constructionItem } from "@workspace/db/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { getAccessibleProjectIds } from "./getAccessibleProjectIds";

export async function getGlobalInspectionRecords() {
    try {
        const access = await getAccessibleProjectIds();
        if (!access || access.collabIds.length === 0) return [];

        const results = await db.select({
            id: inspectionRecord.id,
            date: inspectionRecord.date,
            status: inspectionRecord.status,
            notes: inspectionRecord.notes,
            projectName: project.title,
            itemName: constructionItem.description,
        })
        .from(inspectionRecord)
        .where(inArray(inspectionRecord.projectId, access.collabIds))
        .leftJoin(project, eq(inspectionRecord.projectId, project.id))
        .leftJoin(projectItem, eq(inspectionRecord.projectItemId, projectItem.id))
        .leftJoin(constructionItem, eq(projectItem.itemId, constructionItem.id))
        .orderBy(desc(inspectionRecord.date))
        .limit(20);
        
        return results;
    } catch (error) {
        console.error("Error fetching global inspection records:", error);
        return [];
    }
}
