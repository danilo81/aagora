'use server';

import { auth } from '@clerk/nextjs/server';

const BASE = process.env.NEXT_PUBLIC_WORKSPACE_URL ?? 'http://localhost:3005';

async function headers() {
    const { getToken } = await auth();
    const token = await getToken();
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    } as HeadersInit;
}

export async function wGet<T = unknown>(path: string): Promise<T | null> {
    try {
        const res = await fetch(`${BASE}${path}`, { headers: await headers() });
        if (!res.ok) return null;
        return res.json() as Promise<T>;
    } catch { return null; }
}

export async function wPost<T = unknown>(path: string, body: unknown): Promise<T | null> {
    try {
        const res = await fetch(`${BASE}${path}`, {
            method: 'POST',
            headers: await headers(),
            body: JSON.stringify(body),
        });
        if (!res.ok) return null;
        return res.json() as Promise<T>;
    } catch { return null; }
}

export async function wPatch<T = unknown>(path: string, body?: unknown): Promise<T | null> {
    try {
        const res = await fetch(`${BASE}${path}`, {
            method: 'PATCH',
            headers: await headers(),
            ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        });
        if (!res.ok) return null;
        return res.json() as Promise<T>;
    } catch { return null; }
}

export async function wDelete<T = unknown>(path: string): Promise<T | null> {
    try {
        const res = await fetch(`${BASE}${path}`, {
            method: 'DELETE',
            headers: await headers(),
        });
        if (!res.ok) return null;
        return res.json() as Promise<T>;
    } catch { return null; }
}
