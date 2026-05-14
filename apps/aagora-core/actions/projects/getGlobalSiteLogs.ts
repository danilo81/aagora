"use server";

import { db } from "@workspace/db";
import { siteLog, project } from "@workspace/db/schema";
import { eq, desc, inArray } from "drizzle-orm";
import { getAccessibleProjectIds } from "./getAccessibleProjectIds";

export async function getGlobalSiteLogs() {
    try {
        const access = await getAccessibleProjectIds();
        if (!access || access.collabIds.length === 0) return [];

        const results = await db.select({
            id: siteLog.id,
            type: siteLog.type,
            content: siteLog.content,
            date: siteLog.date,
            projectName: project.title,
            author: sql`'Sistema'`, // Placeholder as we don't have author name easily here
        })
        .from(siteLog)
        .where(inArray(siteLog.projectId, access.collabIds))
        .leftJoin(project, eq(siteLog.projectId, project.id))
        .orderBy(desc(siteLog.date))
        .limit(20);
        
        return results;
    } catch (error) {
        console.error("Error fetching global site logs:", error);
        return [];
    }
}

import { sql } from "drizzle-orm";
