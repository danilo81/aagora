'use server';

import { wGet } from '@/lib/workspace-api';

interface InboxSummary {
    hasUpdates: boolean;
    totalUnread: number;
    notificationsCount: number;
    tasksCount: number;
}

export async function getInboxSummary(): Promise<InboxSummary> {
    return (await wGet<InboxSummary>('/api/notifications/summary')) ?? {
        hasUpdates: false, totalUnread: 0, notificationsCount: 0, tasksCount: 0,
    };
}
