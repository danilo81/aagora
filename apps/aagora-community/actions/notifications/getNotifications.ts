'use server';

import { revalidatePath } from 'next/cache';
import { wGet, wPatch, wDelete } from '@/lib/workspace-api';

export async function getNotifications() {
    return (await wGet('/api/notifications')) ?? [];
}

