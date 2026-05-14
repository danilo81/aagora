'use server';

import { db, project, projectConfig, level, projectItem, projectContact, siteLog, projectTransaction, projectChangeOrder, inspectionRecord } from '@workspace/db';
import { eq, asc, desc } from 'drizzle-orm';

const RESERVED = ['reportes', 'construction', 'operations', 'documentation', 'tasks', 'model', 'board', 'desing', 'shop', 'warehouse', 'accounting', 'undefined', 'null'];

export async function getProjectById(id: string) {
    if (!id || typeof id !== 'string') return null;
    const cleanId = id.trim();
    if (!cleanId || RESERVED.includes(cleanId)) return null;

    try {
        const rows = await db.select().from(project).where(eq(project.id, cleanId)).limit(1);
        const proj = rows[0];
        if (!proj) return null;

        const configRows = await db.select().from(projectConfig)
            .where(eq(projectConfig.projectId, cleanId)).limit(1);
        const config = configRows[0] ?? null;

        const levels = await db.select().from(level)
            .where(eq(level.projectId, cleanId))
            .orderBy(asc(level.name));

        const items = await db.query.projectItem.findMany({
            where: eq(projectItem.projectId, cleanId),
            with: {
                item: {
                    with: {
                        supplies: { with: { supply: true } },
                        qualityControls: { with: { subPoints: true } },
                    },
                },
                levelQuantities: true,
            },
        });

        const contactLinks = await db.query.projectContact.findMany({
            where: eq(projectContact.projectId, cleanId),
            with: { contact: true },
        });

        const siteLogs = await db.select().from(siteLog)
            .where(eq(siteLog.projectId, cleanId))
            .orderBy(desc(siteLog.date))
            .limit(30);

        const transactions = await db.select().from(projectTransaction)
            .where(eq(projectTransaction.projectId, cleanId))
            .orderBy(desc(projectTransaction.date))
            .limit(50);

        const changeOrders = await db.select().from(projectChangeOrder)
            .where(eq(projectChangeOrder.projectId, cleanId))
            .orderBy(desc(projectChangeOrder.date));

        const inspectionRecords = await db.query.inspectionRecord.findMany({
            where: eq(inspectionRecord.projectId, cleanId),
            with: { checks: true },
            orderBy: [desc(inspectionRecord.date)],
        });

        const team = contactLinks
            .filter(pc => pc.contact != null)
            .map(pc => ({
                ...(pc.contact as object),
                permissions: pc.permissions ?? {},
            }));

        return JSON.parse(JSON.stringify({
            ...proj,
            config,
            levels,
            team,
            items,
            siteLogs,
            transactions,
            changeOrders,
            inspectionRecords,
            supplyRequests: [],
        }));
    } catch (err) {
        console.error('[getProjectById] error:', err);
        return null;
    }
}
