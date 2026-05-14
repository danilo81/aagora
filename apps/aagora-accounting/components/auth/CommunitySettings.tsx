"use client";

import { Globe } from 'lucide-react';

interface CommunitySettingsProps {
    type: "organization" | "user";
}

export function CommunitySettings({ type }: CommunitySettingsProps) {
    return (
        <div className="space-y-6 p-2">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                    <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-sm font-black uppercase tracking-tight">
                        {type === "organization" ? "Comunidad de la Organización" : "Comunidad del Usuario"}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider opacity-60">
                        {type === "organization"
                            ? "Configura la visibilidad y participación de la organización"
                            : "Configura tu participación en la comunidad"}
                    </p>
                </div>
            </div>
        </div>
    );
}
