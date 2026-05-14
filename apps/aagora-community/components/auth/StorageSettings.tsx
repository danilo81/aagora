"use client";

import { useState, useEffect } from 'react';
import { Database, HardDrive, Info } from 'lucide-react';
import { Progress } from '@workspace/ui/components/progress';
import { Badge } from '@workspace/ui/components/badge';
import { getStorageStats } from '@/actions/auth/getStorageStats';

export function StorageSettings() {
    const [stats, setStats] = useState<{ used: number; total: number; percentage: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await getStorageStats();
                if (res.success) {
                    setStats({
                        used: res.used || 0,
                        total: res.total || 1024 * 1024 * 1024,
                        percentage: res.percentage || 0
                    });
                }
            } catch (error) {
                console.error('Error fetching storage stats:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-2">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                    <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-sm font-black uppercase tracking-tight">Almacenamiento Cloud</h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider opacity-60">Gestiona tu espacio en la nube y archivos.</p>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-accent/20 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Estado del Almacenamiento</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-black uppercase text-primary tracking-tighter">
                                {formatBytes(stats?.used || 0)}
                            </p>
                            <p className="text-sm text-muted-foreground font-bold uppercase tracking-tight opacity-50">
                                de {formatBytes(stats?.total || 0)}
                            </p>
                        </div>
                    </div>
                    <Badge className={`${
                        (stats?.percentage || 0) > 90 ? "bg-red-500/10 text-red-500 border-red-500/20" :
                        (stats?.percentage || 0) > 70 ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    } text-[9px] font-black uppercase`}>
                        {stats?.percentage.toFixed(1)}% Usado
                    </Badge>
                </div>

                <div className="space-y-2">
                    <Progress 
                        value={stats?.percentage} 
                        className={`h-2 bg-accent/20 ${
                            (stats?.percentage || 0) > 90 ? "[&>div]:bg-red-500" :
                            (stats?.percentage || 0) > 70 ? "[&>div]:bg-amber-500" :
                            "[&>div]:bg-primary"
                        }`}
                    />
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                        <span>0 GB</span>
                        <span>{formatBytes(stats?.total || 0)}</span>
                    </div>
                </div>
                
                <div className="pt-4 border-t border-accent/10 grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-accent/5 border border-accent/10 space-y-1">
                        <div className="flex items-center gap-2 text-primary">
                            <HardDrive className="h-3 w-3" />
                            <span className="text-[10px] font-black uppercase tracking-tight">Tipo de Cuota</span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-tighter">Plan Estándar</p>
                    </div>
                    <div className="p-3 rounded-xl bg-accent/5 border border-accent/10 space-y-1">
                        <div className="flex items-center gap-2 text-primary">
                            <Info className="h-3 w-3" />
                            <span className="text-[10px] font-black uppercase tracking-tight">Actualización</span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-tighter">Automática</p>
                    </div>
                </div>

                <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest leading-relaxed text-center opacity-60">
                    Tu almacenamiento se distribuye entre proyectos, librería y contactos.
                </p>
            </div>
        </div>
    );
}
