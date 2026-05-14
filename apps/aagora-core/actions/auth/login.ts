'use server';

import { db, user } from '@workspace/db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type LoginResult = {
    success: true;
    user: {
        id: string;
        email: string;
        name: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        storageLimit: string;
    };
} | {
    success: false;
    error: string;
};

export async function login(credentials: { email: string; password: string }): Promise<LoginResult> {
    try {
        const [existingUser] = await db.select({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            password: user.password,
            storageLimit: user.storageLimit,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })
            .from(user)
            .where(eq(user.email, credentials.email))
            .limit(1);

        if (!existingUser || !existingUser.password) {
            return { success: false, error: 'Invalid email or password.' };
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, existingUser.password);

        if (!isPasswordValid) {
            return { success: false, error: 'Invalid email or password.' };
        }

        const cookieStore = await cookies();
        cookieStore.set('userId', existingUser.id, {
            httpOnly: true,

            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

    } catch (error: unknown) {
        const err = error as { digest?: string; message?: string };
        if (err.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error('Login error:', error);
        return { success: false, error: 'An unexpected error occurred.' };
    }

    redirect('/dashboard');
}
