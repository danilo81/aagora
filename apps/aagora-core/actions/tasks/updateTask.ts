'use server';

import { updateTaskSchema, type UpdateTaskInput } from '@workspace/db/validation';
import { revalidatePath } from 'next/cache';
import { wPatch } from '@/lib/workspace-api';

export async function updateTask(id: string, data: UpdateTaskInput) {
    const parsed = updateTaskSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

    const result = await wPatch(`/api/tasks/${id}`, parsed.data);
    if (result) revalidatePath('/dashboard');
    return result ?? { success: false };
}
