"use client";

import { Card } from '@workspace/ui/components/card';
import { Search, MapPin, SearchCheck, Clock, MessageSquare, Tag } from 'lucide-react';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';


const MOCK_MERCH = [
    {
        id: '1',
        title: 'Se busca Subcontratista de Tabiquería',
        type: 'Servicio',
        description: 'Proyecto residencial de 40 viviendas. Inicio en 2 semanas. Contactar para planos.',
        price: 'A convenir',
        location: 'Madrid, Centro',
        timeAgo: 'Hace 3 horas',
        seller: {
            name: 'Constructora Atlas',
            avatar: 'https://i.pravatar.cc/150?u=atlas',
            verified: true
        }
    },
    {
        id: '2',
        title: 'Alquiler de Grúa Torre Liebherr',
        type: 'Maquinaria',
        description: 'Disponible a partir del próximo mes. Altura 30m, pluma 45m. Excelente estado.',
        price: '€1,200/mes',
        location: 'Valencia',
        timeAgo: 'Hace 1 día',
        seller: {
            name: 'Grúas Levante S.L.',
            avatar: 'https://i.pravatar.cc/150?u=gruas',
            verified: true
        }
    },
    {
        id: '3',
        title: 'Lote de Andamios Modulares (Usado)',
        type: 'Material',
        description: 'Se vende lote de 500m2 de andamio europeo seminuevo. Certificación vigente.',
        price: '€4,500',
        location: 'Sevilla',
        timeAgo: 'Hace 2 días',
        seller: {
            name: 'Pedro M.',
            avatar: 'https://i.pravatar.cc/150?u=pedro',
            verified: false
        }
    }
];

export default function MarketplacePage() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Marketplace Aagora</h1>
                    <p className="text-muted-foreground mt-1">Compra, vende o alquila maquinaria, servicios y ofertas laborales.</p>
                </div>
                <Button className="shrink-0 bg-primary text-white">
                    <Tag className="h-4 w-4 mr-2" />
                    Crear Anuncio
                </Button>
            </div>

            <div className="bg-card/50 p-4 rounded-xl border border-muted/50 backdrop-blur-sm shadow-sm flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar anuncios, maquinaria, servicios..."
                        className="pl-10 bg-background/50 border-muted/50"
                    />
                </div>
                <div className="flex gap-2 shrink-0">
                    <Button variant="outline" className="border-muted/50">
                        <MapPin className="h-4 w-4 mr-2 hidden sm:block" />
                        Ubicación
                    </Button>
                    <Button variant="outline" className="border-muted/50">
                        <SearchCheck className="h-4 w-4 mr-2 hidden sm:block" />
                        Categoría
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {MOCK_MERCH.map((item) => (
                    <Card key={item.id} className="group overflow-hidden border-muted/50 hover:border-primary/50 transition-all bg-card/30 backdrop-blur-sm flex flex-col md:flex-row">
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-transparent font-bold tracking-widest text-[10px] uppercase">
                                    {item.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {item.timeAgo}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 max-w-3xl line-clamp-2">{item.description}</p>

                            <div className="flex flex-wrap items-center gap-4 mt-auto">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={item.seller.avatar} />
                                        <AvatarFallback>{item.seller.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{item.seller.name}</span>
                                </div>
                                <span className="text-muted-foreground hidden md:inline">•</span>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" /> {item.location}
                                </span>
                            </div>
                        </div>
                        <div className="bg-muted/10 p-6 md:w-64 border-t md:border-t-0 md:border-l border-muted/30 flex flex-col justify-center items-center gap-4 text-center">
                            <div>
                                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">Precio</p>
                                <p className="text-2xl font-black text-foreground">{item.price}</p>
                            </div>
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white gap-2 shadow-sm">
                                <MessageSquare className="h-4 w-4" /> Contactar
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="py-8 text-center text-muted-foreground">
                <Button variant="outline" className="rounded-full px-8">
                    Cargar más anuncios
                </Button>
            </div>
        </div>
    );
}
