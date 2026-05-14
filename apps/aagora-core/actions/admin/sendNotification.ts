'use server';

import { db, user } from '@workspace/db';
import { notification } from '@workspace/db/schema';
import { eq } from 'drizzle-orm';
import { clerkClient } from '@clerk/nextjs/server';
import { requireAdmin } from '@/lib/clerk-auth';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export async function sendNotification(data: {
    targetUserId: string | 'all';
    title: string;
    message: string;
    type: NotificationType;
}): Promise<{ success: boolean; count?: number; error?: string }> {
    if (!(await requireAdmin())) return { success: false, error: 'Acceso denegado: se requiere rol de administrador.' };

    if (!data.title.trim() || !data.message.trim()) {
        return { success: false, error: 'El título y el mensaje son obligatorios.' };
    }

    try {
        const client = await clerkClient();
        let clerkUserIds: string[] = [];

        if (data.targetUserId === 'all') {
            const clerkUsers = await client.users.getUserList({ limit: 500 });
            clerkUserIds = clerkUsers.data.map(u => u.id);
        } else {
            const dbUser = await db.query.user.findFirst({
                where: eq(user.id, data.targetUserId),
                columns: { email: true },
            });
            if (!dbUser) return { success: false, error: 'Usuario no encontrado.' };

            const clerkUsers = await client.users.getUserList({ emailAddress: [dbUser.email] });
            const clerkUser = clerkUsers.data[0];
            if (!clerkUser) return { success: false, error: 'El usuario no tiene cuenta activa en el sistema.' };
            clerkUserIds = [clerkUser.id];
        }

        if (clerkUserIds.length === 0) return { success: false, error: 'No hay usuarios disponibles para notificar.' };

        await db.insert(notification).values(
            clerkUserIds.map(userId => ({
                userId,
                title: data.title.trim(),
                message: data.message.trim(),
                type: data.type,
            }))
        );

        return { success: true, count: clerkUserIds.length };
    } catch (error) {
        console.error('sendNotification error:', error);
        return { success: false, error: 'Error interno al enviar la notificación.' };
    }
}
