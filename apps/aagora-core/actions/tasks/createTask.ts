'use server';

import { createTaskSchema, type CreateTaskInput } from '@workspace/db/validation';
import { revalidatePath } from 'next/cache';
import { wPost } from '@/lib/workspace-api';

export async function createTask(data: CreateTaskInput) {
    const parsed = createTaskSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

    const result = await wPost('/api/tasks', parsed.data);
    if (result) revalidatePath('/dashboard');
    return result ?? { success: false };
}
