"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@workspace/ui/components/card';
import { Search, MapPin, Briefcase, Plus, MessageSquare, Loader2, Users } from 'lucide-react';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { getCommunityProfiles, CommunityProfile } from '@/actions';

export default function ContactsPage() {
    const [profiles, setProfiles] = useState<CommunityProfile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadProfiles = async () => {
            setIsLoading(true);
            try {
                const data = await getCommunityProfiles();
                setProfiles(data);
            } catch (error) {
                console.error('Error al cargar perfiles:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadProfiles();
    }, []);

    const filteredProfiles = profiles.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                        <Users className="h-8 w-8 text-primary" />
                        Contactos y Red Profesional
                    </h1>
                    <p className="text-muted-foreground mt-1">Conecta con otros profesionales del sector de la construcción y amplía tu red.</p>
                </div>
                <Button className="shrink-0 bg-primary text-white hover:bg-primary/90 rounded-xl px-6">
                    <Plus className="h-4 w-4 mr-2" />
                    Invitar a un colega
                </Button>
            </div>

            <div className="bg-card/50 p-4 rounded-xl border border-muted/50 backdrop-blur-sm shadow-sm flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por nombre, especialidad o empresa..."
                        className="pl-10 bg-background/50 border-muted/50 focus-visible:ring-primary rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-muted/50 whitespace-nowrap rounded-xl shadow-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Ubicación
                    </Button>
                    <Button variant="outline" className="border-muted/50 whitespace-nowrap rounded-xl shadow-sm">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Rol
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground animate-pulse">Consultando red AAGORA...</p>
                </div>
            ) : filteredProfiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProfiles.map((contact) => (
                        <Card key={contact.id} className="group overflow-hidden border-muted/50 hover:border-primary/50 transition-all bg-card/30 backdrop-blur-sm flex flex-col rounded-2xl">
                            <CardHeader className="w-full pt-8 pb-0 flex flex-col items-center">
                                <Avatar className="h-24 w-24 border-4 border-background shadow-lg mb-4 ring-2 ring-transparent transition-all group-hover:ring-primary/50">
                                    <AvatarImage src={contact.avatar} />
                                    <AvatarFallback className="font-black text-xl">{contact.name[0]}</AvatarFallback>
                                </Avatar>
                                <h3 className="font-bold text-lg text-center">{contact.name}</h3>
                                <p className="text-sm text-primary font-bold uppercase tracking-tight">{contact.role}</p>
                                <div className="space-y-1 mt-3">
                                    <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1.5 font-bold uppercase tracking-widest opacity-60">
                                        <MapPin className="h-3 w-3" /> {contact.location}
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 w-full flex-1 flex flex-col gap-5">
                                <div className="flex flex-wrap gap-1.5 justify-center">
                                    {contact.skills.map(skill => (
                                        <Badge key={skill} variant="secondary" className="text-[9px] bg-primary/5 text-primary border-primary/10 uppercase font-black tracking-widest py-0.5">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2 mt-auto pt-4">
                                    {contact.connected ? (
                                        <Button variant="outline" className="w-full font-black uppercase text-[10px] tracking-widest rounded-xl border-accent hover:bg-accent h-10">
                                            <MessageSquare className="h-3.5 w-3.5 mr-2" /> Mensaje
                                        </Button>
                                    ) : (
                                        <Button className="w-full font-black uppercase text-[10px] tracking-widest bg-primary text-background hover:bg-primary/90 rounded-xl h-10 shadow-lg shadow-primary/10">
                                            <Plus className="h-3.5 w-3.5 mr-2" /> Conectar
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-card/20 rounded-3xl border border-dashed border-muted/50 p-12">
                    <div className="bg-primary/5 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="h-10 w-10 text-primary opacity-20" />
                    </div>
                    <h3 className="text-xl font-bold font-headline mb-2">No se encontraron perfiles</h3>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto">Prueba ajustando tus términos de búsqueda o vuelve más tarde cuando más miembros se unan a la comunidad.</p>
                </div>
            )}
        </div>
    );
}
