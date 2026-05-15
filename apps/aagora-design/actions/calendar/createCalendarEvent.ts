'use server';

import { createCalendarEventSchema, type CreateCalendarEventInput } from '@workspace/db/validation';
import { wPost } from '@/lib/workspace-api';

export async function createCalendarEvent(data: CreateCalendarEventInput): Promise<{ success: boolean; error?: string }> {
    const parsed = createCalendarEventSchema.safeParse(data);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' };

    return (await wPost<{ success: boolean; error?: string }>('/api/calendar', parsed.data)) ?? { success: false };
}
