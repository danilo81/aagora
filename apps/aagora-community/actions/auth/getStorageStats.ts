'use server';

import { db, user, libraryFile, projectDocument, contactDocument, contact } from "@workspace/db";
import { eq, sum } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getStorageStats() {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('userId')?.value;

        if (!userId) {
            return { success: false, error: 'No autorizado' };
        }

        const [existingUser] = await db.select({
            id: user.id,
            storageLimit: user.storageLimit
        })
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

        if (!existingUser) {
            return { success: false, error: 'Usuario no encontrado' };
        }

        const limitStr = existingUser.storageLimit || '1GB';
        let limitBytes = 1024 * 1024 * 1024;

        const match = limitStr.match(/^(\d+(?:\.\d+)?)\s*([KMGT]B|[B])$/i);
        if (match && match[1] && match[2]) {
            const value = parseFloat(match[1]);
            const unit = match[2].toUpperCase();
            const multipliers: Record<string, number> = {
                'B': 1,
                'KB': 1024,
                'MB': 1024 * 1024,
                'GB': 1024 * 1024 * 1024,
                'TB': 1024 * 1024 * 1024 * 1024,
            };
            limitBytes = value * (multipliers[unit] ?? 1024 * 1024 * 1024);
        }

        const [libraryFilesSum] = await db.select({ total: sum(libraryFile.size) })
            .from(libraryFile)
            .where(eq(libraryFile.userId, userId));

        const [projectDocsSum] = await db.select({ total: sum(projectDocument.size) })
            .from(projectDocument)
            .where(eq(projectDocument.userId, userId));

        const [contactDocsSum] = await db.select({ total: sum(contactDocument.size) })
            .from(contactDocument)
            .innerJoin(contact, eq(contactDocument.contactId, contact.id))
            .where(eq(contact.userId, userId));

        const totalUsed = Number(libraryFilesSum?.total ?? 0) +
            Number(projectDocsSum?.total ?? 0) +
            Number(contactDocsSum?.total ?? 0);

        return {
            success: true,
            used: totalUsed,
            total: limitBytes,
            percentage: Math.min(100, (totalUsed / limitBytes) * 100)
        };
    } catch (error) {
        console.error('Error fetching storage stats:', error);
        return {
            success: false,
            used: 0,
            total: 1024 * 1024 * 1024,
            percentage: 0,
            error: 'Error al obtener estadísticas de almacenamiento'
        };
    }
}
