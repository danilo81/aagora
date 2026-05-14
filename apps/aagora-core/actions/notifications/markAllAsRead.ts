'use server';

import { revalidatePath } from 'next/cache';
import { wPatch } from '@/lib/workspace-api';

export async function markAllAsRead() {
    const result = await wPatch('/api/notifications');
    if (result) { revalidatePath('/notifications'); revalidatePath('/'); }
    return result ?? { success: false };
}
