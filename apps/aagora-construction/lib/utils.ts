import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Safe read from a Record using a variable key — avoids Generic Object Injection Sink */
export function safeGet<T>(record: Record<string, T>, key: string): T | undefined {
  return Object.entries(record).find(([k]) => k === key)?.[1];
}

/** Safe update of a Record with a variable key — avoids Variable Assigned to Object Injection Sink */
export function safeUpdate<T>(record: Record<string, T>, key: string, value: T): Record<string, T> {
  return Object.fromEntries([...Object.entries(record).filter(([k]) => k !== key), [key, value]]);
}

export function getTypologyGroup(typology: string): 'mat' | 'lab' | 'equ' {
  const t = (typology || '').toLowerCase().trim();
  if (t.includes('material') || t.includes('insumo') || t.includes('mat')) return 'mat';
  if (t.includes('labor') || t.includes('mano') || t.includes('obra') || t.includes('personal') || t.includes('honorario') || t.includes('lab')) return 'lab';
  if (t.includes('equipo') || t.includes('herramienta') || t.includes('maquinaria') || t.includes('equ')) return 'equ';
  return 'equ';
}

