"use client";

import { Palette, Sun, Moon, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

export function AppearanceSettings() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);


    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="space-y-6 p-2">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                    <Palette className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-sm font-black uppercase tracking-tight">
                        Apariencia
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider opacity-60">
                        Configura el tema visual de AAGORA
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                    onClick={() => setTheme('light')}
                    className={cn(
                        "flex flex-col items-center justify-center p-4 border rounded-xl transition-all h-24",
                        theme === 'light' ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-accent bg-card hover:border-primary/50"
                    )}
                >
                    <Sun className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-xs font-black uppercase tracking-widest text-primary">Claro</span>
                </button>
                <button
                    onClick={() => setTheme('dark')}
                    className={cn(
                        "flex flex-col items-center justify-center p-4 border rounded-xl transition-all h-24",
                        theme === 'dark' ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-accent bg-card hover:border-primary/50"
                    )}
                >
                    <Moon className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-xs font-black uppercase tracking-widest text-primary">Oscuro</span>
                </button>
                <button
                    onClick={() => setTheme('system')}
                    className={cn(
                        "flex items-center justify-center p-4 border rounded-xl transition-all col-span-2 h-16 gap-3",
                        theme === 'system' ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-accent bg-card hover:border-primary/50"
                    )}
                >
                    <Settings className="h-4 w-4 text-primary" />
                    <span className="text-xs font-black uppercase tracking-widest text-primary">Sistema</span>
                </button>
            </div>
        </div>
    );
}
