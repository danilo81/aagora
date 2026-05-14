'use server';

import { wDelete } from '@/lib/workspace-api';

export async function deleteCalendarEvent(id: string) {
    return (await wDelete<{ success: boolean; error?: string }>(`/api/calendar/${id}`)) ?? { success: false };
}
