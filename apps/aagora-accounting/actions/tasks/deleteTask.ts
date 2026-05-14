'use server';

import { revalidatePath } from 'next/cache';
import { wDelete } from '@/lib/workspace-api';

export async function deleteTask(id: string) {
    const result = await wDelete(`/api/tasks/${id}`);
    if (result) revalidatePath('/dashboard');
    return result ?? { success: false };
}
