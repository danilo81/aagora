'use server';

import { createTaskSchema, type CreateTaskInput } from '@workspace/db/validation';
import { revalidatePath } from 'next/cache';
import { wPost } from '@/lib/workspace-api';

export async function createTask(data: CreateTaskInput): Promise<{ success: true } | { success: false; error: string }> {
    const parsed = createTaskSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

    const result = await wPost<{ success: boolean }>('/api/tasks', parsed.data);
    if (result?.success) { revalidatePath('/dashboard'); return { success: true }; }
    return { success: false, error: 'Error al crear la tarea' };
}
