'use server';

import { wGet } from '@/lib/workspace-api';

export async function getCalendarEventsDb() {
    return (await wGet('/api/calendar')) ?? { success: false, events: [] };
}
