'use server';

import { revalidatePath } from 'next/cache';
import { wGet, wPatch } from '@/lib/workspace-api';

export async function getNotifications(): Promise<any[]> {
    return (await wGet<any[]>('/api/notifications')) ?? [];
}

