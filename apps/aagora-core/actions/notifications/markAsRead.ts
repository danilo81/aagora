'use server';

import { revalidatePath } from 'next/cache';
import { wPatch } from '@/lib/workspace-api';

export async function markAsRead(id: string) {
    const result = await wPatch<{ success: boolean }>(`/api/notifications/${id}`);
    if (result) { revalidatePath('/notifications'); revalidatePath('/'); }
    return result ?? { success: false };
}
