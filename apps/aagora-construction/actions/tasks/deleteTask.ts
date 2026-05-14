'use server';

import { revalidatePath } from 'next/cache';
import { wDelete } from '@/lib/workspace-api';

export async function deleteTask(id: string): Promise<{ success: true } | { success: false; error: string }> {
    const result = await wDelete<{ success: boolean }>(`/api/tasks/${id}`);
    if (result?.success) { revalidatePath('/dashboard'); return { success: true }; }
    return { success: false, error: 'Error al eliminar la tarea' };
}
