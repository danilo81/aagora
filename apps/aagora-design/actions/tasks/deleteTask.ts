'use server';

import { revalidatePath } from 'next/cache';
import { wDelete } from '@/lib/workspace-api';

export async function deleteTask(id: string): Promise<{ success: boolean; error?: string }> {
    const result = await wDelete<{ success: boolean; error?: string }>(`/api/tasks/${id}`);
    if (result) revalidatePath('/dashboard');
    return result ?? { success: false };
}
