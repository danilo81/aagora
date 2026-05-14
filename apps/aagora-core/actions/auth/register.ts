'use server';

import { db, user } from '@workspace/db';
import { eq, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

function isStrongPassword(password: string): boolean {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    return hasLowercase && hasUppercase && hasSpecialChar;
}

type RegisterResult = {
    success: true;
    user: {
        id: string;
        email: string;
        name: string | null;
        role: string;
        storageLimit: string;
        createdAt: Date;
        updatedAt: Date;
    };
} | {
    success: false;
    error: string;
};

export async function register(data: { name?: string | null; email: string; password: string }): Promise<RegisterResult> {
    try {
        if (!data.email || !data.password) {
            return { success: false, error: 'Email and password are required.' };
        }

        if (!isStrongPassword(data.password)) {
            return {
                success: false,
                error: 'La contraseña debe contener al menos una letra minúscula, una mayúscula y un carácter especial.',
            };
        }

        console.log("DEBUG: user table name in Drizzle:", (user as any).tableName || "unknown");
        const [existingUser] = await db.select()
            .from(user)
            .where(eq(user.email, data.email))
            .limit(1);

        if (existingUser) {
            return { success: false, error: 'User with this email already exists.' };
        }

        const role = 'viewer';

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const [newUser] = await db.insert(user).values({
            name: data.name || "",
            email: data.email,
            password: hashedPassword,
            role: role,
            storageLimit: '1GB',
        }).returning();

        if (!newUser) {
            return { success: false, error: 'No se pudo crear el usuario.' };
        }


        const cookieStore = await cookies();
        cookieStore.set('userId', newUser.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        const { password, ...userWithoutPassword } = newUser;
        return { success: true, user: userWithoutPassword as any };
    } catch (error: any) {
        console.error('Register error:', error);
        return { success: false, error: 'An unexpected error occurred.' };
    }
}