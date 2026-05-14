'use server';

import { wGet } from '@/lib/workspace-api';

export async function getTasks() {
    return (await wGet('/api/tasks')) ?? [];
}
