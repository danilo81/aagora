'use server';

import { db, user } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getDbUser } from '@/lib/get-db-user';

export async function updateProfile(data: { name?: string, telefono?: string, cargo?: string }) {
    try {
        const dbUser = await getDbUser();
        if (!dbUser) {
            return { error: 'No autorizado' };
        }

        const [updatedUser] = await db.update(user)
            .set({
                name: data.name,
                telefono: data.telefono,
                cargo: data.cargo,
            })
            .where(eq(user.id, dbUser.id))
            .returning();

        if (!updatedUser) {
            return { error: 'Error al actualizar el perfil' };
        }

        const { password, ...userWithoutPassword } = updatedUser;
        return { success: true, user: userWithoutPassword as any };

    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        return { error: 'Error al actualizar el perfil' };
    }
}
