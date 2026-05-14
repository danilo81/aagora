const fs = require('fs');

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const r of replacements) {
        content = content.replace(r.from, r.to);
    }
    fs.writeFileSync(filePath, content);
    console.log('Fixed:', filePath);
}

// 1. getProjectBalances.ts
replaceInFile('d:/BIMUS/plataforma-aagora/aagora/apps/aagora-core/actions/accounting/getProjectBalances.ts', [
    {
        from: 'import { sql, eq } from "drizzle-orm";',
        to: 'import { sql, eq, inArray } from "drizzle-orm";\nimport { getAccessibleProjectIds } from "../projects/getAccessibleProjectIds";'
    },
    {
        from: 'export async function getProjectBalances() {\n    try {\n        const results = await db.select(',
        to: 'export async function getProjectBalances() {\n    try {\n        const access = await getAccessibleProjectIds();\n        if (!access || access.projectIds.length === 0) return [];\n\n        const results = await db.select('
    },
    {
        from: '.from(project)\n        .leftJoin',
        to: '.from(project)\n        .where(inArray(project.id, access.projectIds))\n        .leftJoin'
    }
]);

// 2. getAssets.ts
replaceInFile('d:/BIMUS/plataforma-aagora/aagora/apps/aagora-core/actions/library/construction/assets/getAssets.ts', [
    {
        from: 'import { eq, desc } from "drizzle-orm";',
        to: 'import { eq, desc } from "drizzle-orm";\nimport { getAuthUserId } from "@/lib/clerk-auth";'
    },
    {
        from: 'export async function getAssets() {\n    try {\n        const results = await db.select()',
        to: 'export async function getAssets() {\n    try {\n        const userId = await getAuthUserId();\n        if (!userId) return [];\n\n        const results = await db.select()'
    },
    {
        from: '.from(fixedAsset)\n        .orderBy',
        to: '.from(fixedAsset)\n        .where(eq(fixedAsset.userId, userId))\n        .orderBy'
    }
]);

// 3. getGlobalSupplyPriceUpdates copy.ts -> Let's just delete it, wait no I can just ignore it or delete it.
if (fs.existsSync('d:/BIMUS/plataforma-aagora/aagora/apps/aagora-core/actions/library/construction/supplies/getGlobalSupplyPriceUpdates copy.ts')) {
    fs.unlinkSync('d:/BIMUS/plataforma-aagora/aagora/apps/aagora-core/actions/library/construction/supplies/getGlobalSupplyPriceUpdates copy.ts');
}

// 4. getGlobalSupplyPriceUpdates.ts
replaceInFile('d:/BIMUS/plataforma-aagora/aagora/apps/aagora-core/actions/library/construction/supplies/getGlobalSupplyPriceUpdates.ts', [
    {
        from: 'import { desc } from "drizzle-orm";',
        to: 'import { desc, eq } from "drizzle-orm";\nimport { getAuthUserId } from "@/lib/clerk-auth";'
    },
    {
        from: 'export async function getGlobalSupplyPriceUpdates() {\n    try {\n        const updates = await db.select()',
        to: 'export async function getGlobalSupplyPriceUpdates() {\n    try {\n        const userId = await getAuthUserId();\n        if (!userId) return [];\n\n        const updates = await db.select()'
    },
    {
        from: '.from(supplyPriceHistory)\n        .orderBy',
        to: '.from(supplyPriceHistory)\n        .where(eq(supplyPriceHistory.authorId, userId))\n        .orderBy'
    }
]);

// 5. getSupplyCost.ts -> we need to look at it to fix it, but wait, it's a GET by ID
// 6. getContactAccountingInfo.ts
// 7. getInboxSummary.ts
// 8. getGlobalInspectionRecords.ts
// 9. getGlobalSiteLogs.ts
// 10. getGlobalWarehouseMovements.ts
