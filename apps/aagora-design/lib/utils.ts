import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTypologyGroup(typology: string): 'mat' | 'lab' | 'equ' {
  const t = (typology || '').toLowerCase().trim();
  if (t.includes('material') || t.includes('insumo') || t.includes('mat')) return 'mat';
  if (t.includes('labor') || t.includes('mano') || t.includes('obra') || t.includes('personal') || t.includes('honorario') || t.includes('lab')) return 'lab';
  if (t.includes('equipo') || t.includes('herramienta') || t.includes('maquinaria') || t.includes('equ')) return 'equ';
  return 'equ';
}

