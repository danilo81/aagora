'use server';

import { wDelete } from '@/lib/workspace-api';

export async function deleteCalendarEvent(id: string) {
    return (await wDelete(`/api/calendar/${id}`)) ?? { success: false };
}
