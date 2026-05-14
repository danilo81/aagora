const fs = require('fs');

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const r of replacements) {
        content = content.replace(r.from, r.to);
    }
    fs.writeFileSync(filePath, content);
    console.log('Fixed:', filePath);
}

// 1. getGlobalInspectionRecords.ts
replaceInFile('d:/BIMUS/plataforma-aagora/aagora/apps/aagora-core/actions/projects/getGlobalInspectionRecords.ts', [
    {
        from: 'import { desc, eq } from "drizzle-orm";',
        to: 'import { desc, eq, inArray } from "drizzle-orm";\nimport { getAccessibleProjectIds } from "./getAccessibleProjectIds";'
    },
    {
        from: 'export async function getGlobalInspectionRecords() {\n    try {\n        const results = await db.select(',
        to: 'export async function getGlobalInspectionRecords() {\n    try {\n        const access = await getAccessibleProjectIds();\n        if (!access || access.projectIds.length === 0) return [];\n\n        const results = await db.select('
    },
    {
        from: '.from(inspectionRecord)\n        .leftJoin',
        to: '.from(inspectionRecord)\n        .where(inArray(inspectionRecord.projectId, access.projectIds))\n        .leftJoin'
    }
]);

// 2. getGlobalSiteLogs.ts
replaceInFile('d:/BIMUS/plataforma-aagora/aagora/apps/aagora-core/actions/projects/getGlobalSiteLogs.ts', [
    {
        from: 'import { eq, desc } from "drizzle-orm";',
        to: 'import { eq, desc, inArray } from "drizzle-orm";\nimport { getAccessibleProjectIds } from "./getAccessibleProjectIds";'
    },
    {
        from: 'export async function getGlobalSiteLogs() {\n    try {\n        const results = await db.select(',
        to: 'export async function getGlobalSiteLogs() {\n    try {\n        const access = await getAccessibleProjectIds();\n        if (!access || access.projectIds.length === 0) return [];\n\n        const results = await db.select('
    },
    {
        from: '.from(siteLog)\n        .leftJoin',
        to: '.from(siteLog)\n        .where(inArray(siteLog.projectId, access.projectIds))\n        .leftJoin'
    }
]);

// 3. getGlobalWarehouseMovements.ts
replaceInFile('d:/BIMUS/plataforma-aagora/aagora/apps/aagora-core/actions/projects/getGlobalWarehouseMovements.ts', [
    {
        from: 'import { eq, desc } from "drizzle-orm";',
        to: 'import { eq, desc, inArray } from "drizzle-orm";\nimport { getAccessibleProjectIds } from "./getAccessibleProjectIds";'
    },
    {
        from: 'export async function getGlobalWarehouseMovements() {\n    try {\n        const results = await db.select(',
        to: 'export async function getGlobalWarehouseMovements() {\n    try {\n        const access = await getAccessibleProjectIds();\n        if (!access || access.projectIds.length === 0) return [];\n\n        const results = await db.select('
    },
    {
        from: '.from(warehouseMovement)\n        .leftJoin',
        to: '.from(warehouseMovement)\n        .where(inArray(warehouseMovement.projectId, access.projectIds))\n        .leftJoin'
    }
]);

// 4. getSupplyCost.ts (needs getAuthUserId and user verification? Or just skip if it's not strictly user specific. Wait, supplyCost has authorId?)
replaceInFile('d:/BIMUS/plataforma-aagora/aagora/apps/aagora-core/actions/library/construction/supplies/getSupplyCost.ts', [
    {
        from: "import { eq, desc } from 'drizzle-orm';",
        to: "import { eq, desc } from 'drizzle-orm';\nimport { getAuthUserId } from '@/lib/clerk-auth';"
    },
    {
        from: 'export async function getSupplyCosts(supplyId: string) {\n    try {\n        const costs',
        to: 'export async function getSupplyCosts(supplyId: string) {\n    try {\n        const userId = await getAuthUserId();\n        if (!userId) return [];\n\n        const costs'
    }
]);

// 5. getContactAccountingInfo.ts
replaceInFile('d:/BIMUS/plataforma-aagora/aagora/apps/aagora-core/actions/library/contacts/getContactAccountingInfo.ts', [
    {
        from: 'import { eq, and, sum, ne } from "drizzle-orm";',
        to: 'import { eq, and, sum, ne } from "drizzle-orm";\nimport { getAuthUserId } from "@/lib/clerk-auth";'
    },
    {
        from: 'export async function getContactAccountingInfo(contactId: string) {\n    try {\n        const [contactData',
        to: 'export async function getContactAccountingInfo(contactId: string) {\n    try {\n        const userId = await getAuthUserId();\n        if (!userId) return null;\n\n        const [contactData'
    },
    {
        from: 'db.query.contact.findFirst({ where: eq(contact.id, contactId) })',
        to: 'db.query.contact.findFirst({ where: and(eq(contact.id, contactId), eq(contact.authorId, userId)) })'
    }
]);
