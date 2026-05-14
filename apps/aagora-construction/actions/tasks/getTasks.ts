'use server';

import { wGet } from '@/lib/workspace-api';

export async function getTasks(projectId?: string): Promise<any[]> {
    const path = projectId ? `/api/t