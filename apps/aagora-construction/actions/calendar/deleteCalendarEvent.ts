'use server';

import { wDelete } from '@/lib/workspace-api';

export async function deleteCalendarEvent(id: string): Promise<{ success: boolean }> {
    const res = await wDelete<{ success: boolean }>(`/api/calendar/${id}`);
    return res ?? { success: false };
}
