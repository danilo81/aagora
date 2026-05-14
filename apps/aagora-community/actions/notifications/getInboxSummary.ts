'use server';

import { wGet } from '@/lib/workspace-api';

interface InboxSummary {
    notifications: number;
    tasks: number;
    events: number;
    hasUpdates: boolean;
    totalUnread: number;
}

export async function getInboxSummary(): Promise<InboxSummary> {
    return (await wGet<InboxSummary>('/api/notifications/summary')) ?? {
        notifications: 0, tasks: 0, events: 0, hasUpdates: false, totalUnread: 0,
    };
}
