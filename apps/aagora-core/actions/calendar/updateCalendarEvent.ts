'use server';

import { updateCalendarEventSchema, type UpdateCalendarEventInput } from '@workspace/db/validation';
import { wPatch } from '@/lib/workspace-api';

export async function updateCalendarEvent(id: string, data: UpdateCalendarEventInput) {
    const parsed = updateCalendarEventSchema.safeParse(data);
    if (!parsed.success) return { success: false, event: null, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

    return (await wPatch<{ success: boolean; event: any; error?: string }>(`/api/calendar/${id}`, parsed.data)) ?? { success: false, event: null };
}
