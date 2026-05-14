'use server';

import { revalidatePath } from 'next/cache';
import { wGet, wPatch } from '@/lib/workspace-api';

export async function getNotifications(): Promise<any[]> {
    return (await wGet<any[]>('/api/notifications')) ?? [];
}

export async function markAllAsRead(): Promise<{ success: boolean }> {
    const result = await wPatch<{ success: boolean }>('/api/notifications');
    if (result) { revalidatePath('/notifications'); revalidatePath('/'); }
    return result ?? { success: false };
}
