'use server';

import { revalidatePath } from 'next/cache';
import { wDelete } from '@/lib/workspace-api';

export async function deleteNotification(id: string) {
    const result = await wDelete(`/api/notifications/${id}`);
    if (result) { revalidatePath('/notifications'); revalidatePath('/'); }
    return result ?? { success: false };
}
