'use server';

import { revalidatePath } from 'next/cache';
import { wGet, wPatch, wDelete } from '@/lib/workspace-api';

export async function getNotifications() {
    return (await wGet('/api/notifications')) ?? [];
}

export async function markAllAsRead() {
    const result = await wPatch('/api/notifications');
    if (result) { revalidatePath('/notifications'); revalidatePath('/'); }
    return result ?? { success: false };
}
