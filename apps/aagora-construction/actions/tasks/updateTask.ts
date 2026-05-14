'use server';

import { updateTaskSchema, type UpdateTaskInput } from '@workspace/db/validation';
import { revalidatePath } from 'next/cache';
import { wPatch } from '@/lib/workspace-api';

export async function updateTask(id: string, data: UpdateTaskInput): Promise<{ success: true } | { success: false; error: string }> {
    const parsed = updateTaskSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

    const result = await wPatch<{ success: boolean }>(`/api/tasks/${id}`, parsed.data);
    if (result?.success) { revalidatePath('/dashboard'); return { success: true }; }
    return { success: false, error: 'Error al actualizar la tarea' };
}
