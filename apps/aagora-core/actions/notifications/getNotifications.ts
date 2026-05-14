'use server';

import { wGet } from '@/lib/workspace-api';

export async function getNotifications() {
    return (await wGet('/api/notifications')) ?? [];
}
