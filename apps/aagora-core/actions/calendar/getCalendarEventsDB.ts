'use server';

import { wGet } from '@/lib/workspace-api';

export async function getCalendarEventsDb() {
    return (await wGet<{ success: boolean; events: any[] }>('/api/calendar')) ?? { success: false, events: [] };
}
