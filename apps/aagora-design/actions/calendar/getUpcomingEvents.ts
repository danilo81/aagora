'use server';

import { wGet } from '@/lib/workspace-api';

export async function getUpcomingEvents() {
    return (await wGet<any[]>('/api/calendar/upcoming')) ?? [];
}
