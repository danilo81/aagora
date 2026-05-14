'use server';

import { db, user } from '@workspace/db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { requireAdmin } from '@/lib/clerk-auth';

export async function createUser(data: {
    name?: string;
    email: string;
    password: string;
    role?: string;
    storageLimit?: string;
    telefono?: string;
    cargo?: string;
}) {
    try {
        if (!(await requireAdmin())) return { error: 'Acceso denegado: se requiere rol de administrador.' };

        if (!data.email || !data.password) {
            return { error: 'El correo electrónico y la contraseña son obligatorios.' };
        }

        const existing = await db.query.user.findFirst({ where: eq(user.email, data.email) });
        if (existing) return { error: 'Ya existe un usuario con este correo electrónico.' };

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const [newUser] = await db.insert(user).values({
            name: data.name || '',
            email: data.email,
            password: hashedPassword,
            role: data.role || 'viewer',
            storageLimit: data.storageLimit || '1GB',
            telefono: data.telefono || null,
            cargo: data.cargo || null,
        }).returning();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return { error: 'Error al crear el usuario.' };
    }
}