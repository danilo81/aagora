"use client";

import { CreditCard } from 'lucide-react';
import { Badge } from '@workspace/ui/components/badge';

export function SubscriptionSettings() {
    return (
        <div className="space-y-6 p-2">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                    <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-sm font-black uppercase tracking-tight">Suscripción y Plan</h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider opacity-60">Gestiona tu plan y límites del sistema.</p>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-accent/20 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Plan Actual</p>
                        <p className="text-sm font-bold uppercase text-primary tracking-tight">Aagora Professional</p>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-black uppercase">Activo</Badge>
                </div>
                
                <div className="pt-4 border-t border-accent/10">
                    <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest leading-relaxed">
                        Actualmente tienes acceso ilimitado a todas las herramientas de obra, contabilidad y gestión de activos.
                    </p>
                </div>
            </div>
        </div>
    );
}
