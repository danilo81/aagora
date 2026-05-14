"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@workspace/ui/components/card';
import { Newspaper, Heart, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon, FileText, Send, CheckCircle2 } from 'lucide-react';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';


const MOCK_NEWS = [
    {
        id: '1',
        author: {
            name: 'Carlos Ruiz',
            avatar: 'https://i.pravatar.cc/150?u=carlos',
            role: 'Arquitecto Senior',
            verified: true,
        },
        timeAgo: 'Hace 2 horas',
        content: 'Increíble avance en el proyecto Residencial Aurora. La integración de los nuevos materiales sostenibles está reduciendo la huella de carbono estimada en un 15% 🌍♻️ #Sostenibilidad #Arquitectura',
        image: 'https://picsum.photos/seed/aurora2/800/400',
        likes: 45,
        comments: 12,
        shares: 3,
        tags: ['Construcción', 'Sostenibilidad'],
    },
    {
        id: '2',
        author: {
            name: 'Aagora Official',
            avatar: 'https://i.pravatar.cc/150?u=aagora',
            role: 'Plataforma',
            verified: true,
        },
        timeAgo: 'Hace 5 horas',
        content: '¡Nueva actualización en la plataforma! Ahora puedes gestionar tus certificados de materiales directamente desde el módulo de inventario. Revisa las notas de la versión para más detalles. 🚀',
        likes: 128,
        comments: 24,
        shares: 15,
        tags: ['Actualización', 'Novedades'],
    },
    {
        id: '3',
        author: {
            name: 'María Delgado',
            avatar: 'https://i.pravatar.cc/150?u=maria',
            role: 'Ingeniera Civil',
            verified: false,
        },
        timeAgo: 'Ayer',
        content: 'Buscando recomendaciones de proveedores para acero estructural en la región norte. Necesitamos cotizaciones para el próximo trimestre. ¿Alguien tiene contactos confiables? 🏗️',
        likes: 12,
        comments: 8,
        shares: 1,
        tags: ['Proveedores', 'Cotización'],
    }
];

export default function CommunityNewsPage() {
    return (
        <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-500">

            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/20 text-primary">
                    <Newspaper className="h-5 w-5" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold font-headline">Noticias de la Comunidad</h1>
                    <p className="text-sm text-muted-foreground">Mantente al día con lo último en el sector.</p>
                </div>
            </div>

            {/* Crear Publicación */}
            <Card className="border-muted/50 bg-card/40 backdrop-blur-sm shadow-sm overflow-hidden">
                <div className="p-4">
                    <div className="flex gap-4">
                        <Avatar className="h-10 w-10 border border-muted">
                            <AvatarImage src="https://i.pravatar.cc/150?u=me" />
                            <AvatarFallback>Yo</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                            <Input
                                placeholder="¿Qué estás construyendo hoy? Comparte tus novedades..."
                                className="bg-background/50 border-muted/50 focus-visible:ring-primary h-12 rounded-xl"
                            />
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2 rounded-lg">
                                        <ImageIcon className="h-4 w-4" />
                                        <span className="hidden sm:inline text-xs">Foto/Video</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2 rounded-lg">
                                        <FileText className="h-4 w-4" />
                                        <span className="hidden sm:inline text-xs">Documento</span>
                                    </Button>
                                </div>
                                <Button size="sm" className="rounded-full px-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                                    Publicar <Send className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Feed de Noticias */}
            <div className="space-y-6">
                {MOCK_NEWS.map((news) => (
                    <Card key={news.id} className="border-muted/50 bg-card/40 backdrop-blur-sm shadow-sm hover:border-primary/20 transition-all">
                        <CardHeader className="p-4 pb-2">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border border-muted ring-2 ring-transparent transition-all hover:ring-primary/50 cursor-pointer">
                                        <AvatarImage src={news.author.avatar} />
                                        <AvatarFallback>{news.author.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-1.5 cursor-pointer">
                                            <h3 className="font-bold text-sm hover:underline">{news.author.name}</h3>
                                            {news.author.verified && <CheckCircle2 className="h-3 w-3 text-primary" />}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>{news.author.role}</span>
                                            <span>•</span>
                                            <span>{news.timeAgo}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-1 space-y-4">
                            <p className="text-sm whitespace-pre-wrap">{news.content}</p>

                            {news.image && (
                                <div className="relative aspect-video rounded-xl overflow-hidden border border-muted/50">
                                    <Image src={news.image} alt="Publicación" fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
                                </div>
                            )}

                            {news.tags && news.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {news.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer border-transparent">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="p-2 px-4 border-t border-muted/20">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 gap-2 h-9">
                                        <Heart className="h-4 w-4" />
                                        <span className="text-xs">{news.likes}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10 gap-2 h-9">
                                        <MessageSquare className="h-4 w-4" />
                                        <span className="text-xs">{news.comments}</span>
                                    </Button>
                                </div>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-primary/10 gap-2 h-9">
                                    <Share2 className="h-4 w-4" />
                                    <span className="text-xs">Compartir ({news.shares})</span>
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="py-8 text-center text-muted-foreground">
                <p className="text-sm">Has llegado al final de las noticias por ahora.</p>
            </div>
        </div>
    );
}
