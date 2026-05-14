'use server';

import { wGet } from '@/lib/workspace-api';

export async function getInboxSummary() {
    return (await wGet('/api/notifications/summary')) ?? {
        hasUpdates: false, totalUnread: 0, notificationsCount: 0, tasksCount: 0,
    };
}
