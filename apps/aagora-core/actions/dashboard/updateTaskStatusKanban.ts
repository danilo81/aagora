'use server';

import { wPatch } from '@/lib/workspace-api';

export async function updateTaskStatusKanban(taskId: string, newStatus: string) {
    return (await wPatch(`/api/tasks/${taskId}/status`, { status: newStatus })) ?? { success: false };
}
