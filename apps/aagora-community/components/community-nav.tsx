"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, Users, Box, ShoppingBag, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { name: "Noticias", href: "/", icon: Newspaper, exact: true },
    { name: "Contactos", href: "/contacts", icon: Users, exact: false },
    { name: "Insumos", href: "/supplies", icon: Box, exact: false },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBag, exact: false },
    { name: "Proyectos", href: "/projects", icon: FolderKanban, exact: false },
];

export function CommunityNav() {
    const pathname = usePathname();

    return (
        <div className="sticky top-14 z-30 w-full border-b border-muted/30 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4">
                <div className="flex h-12 items-center gap-1 overflow-x-auto no-scrollbar">
                    {NAV_ITEMS.map(({ name, href, icon: Icon, exact }) => {
                        const isActive = exact
                            ? pathname === href
                            : pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className={cn("h-3.5 w-3.5", isActive ? "text-primary" : "text-muted-foreground")} />
                                {name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
