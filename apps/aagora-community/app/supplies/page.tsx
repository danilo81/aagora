"use client";

import { useEffect, useState, useMemo } from 'react';
import {
    Search,
    ShoppingCart,
    Info,
    PackageOpen,
    Loader2,
    MoreVertical,
    Download,
    LayoutGrid,
    List,
    Users
} from 'lucide-react';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { Badge } from '@workspace/ui/components/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@workspace/ui/components/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { getCommunitySupplies, importCommunitySupply, importCommunitySuppliesBulk } from '@/actions';
import React from 'react';
import { useToast } from '@/hooks/use-toast';

const categoriesList = ["Todos", "Obra Gruesa", "Obra Fina", "Acabados", "Aislamiento e Impermeabilización", "Instalaciones Hidrosanitarias", "Instalaciones Eléctricas", "Maquinaria Pesada", "Herramientas Menores", "Seguridad Industrial", "Servicios Especializados", "Herrería y Carpintería", "Otros"];

export default function SuppliesPage() {
    const [supplies, setSupplies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const { toast } = useToast();
    const [importingId, setImportingId] = useState<string | null>(null);
    const [isGroupedByProvider, setIsGroupedByProvider] = useState(false);
    const [importingProviders, setImportingProviders] = useState<string[]>([]);

    useEffect(() => {
        fetchSupplies();
    }, [selectedCategory]);

    const fetchSupplies = async () => {
        setLoading(true);
        try {
            const catFilter = selectedCategory === 'Todos' ? 'all' : selectedCategory;
            const res = await getCommunitySupplies(catFilter);
            if (res.success && res.supplies) {
                setSupplies(res.supplies);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleImport = async (id: string) => {
        setImportingId(id);
        try {
            const res = await importCommunitySupply(id);
            if (res.success) {
                toast({
                    title: "Insumo Importado",
                    description: "El insumo ha sido añadido a tu biblioteca personal con el proveedor original.",
                });
            } else {
                toast({
                    title: "Error",
                    description: res.error,
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Ocurrió un error inesperado al importar.",
                variant: "destructive"
            });
        } finally {
            setImportingId(null);
        }
    };

    const handleBulkImport = async (providerName: string, supplyIds: string[]) => {
        setImportingProviders(prev => [...prev, providerName]);
        try {
            const res = await importCommunitySuppliesBulk(supplyIds);
            if (res.success) {
                toast({
                    title: "Importación Masiva Completada",
                    description: `${res.count} insumos han sido añadidos a tu biblioteca.`,
                });
            } else {
                toast({
                    title: "Error",
                    description: res.error,
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Ocurrió un error inesperado al importar.",
                variant: "destructive"
            });
        } finally {
            setImportingProviders(prev => prev.filter(p => p !== providerName));
        }
    };

    const filteredSupplies = useMemo(() => {
        return supplies.filter(s =>
            s.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [supplies, searchQuery]);

    const groupedSupplies = useMemo(() => {
        if (!isGroupedByProvider) return null;

        const groups: Record<string, any[]> = {};
        filteredSupplies.forEach(s => {
            const supplierName = s.user?.name || s.costs?.[0]?.supplier?.name || "Sin Registros";
            if (!groups[supplierName]) groups[supplierName] = [];
            groups[supplierName].push(s);
        });
        return groups;
    }, [filteredSupplies, isGroupedByProvider]);

    return (
        <div className="container mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Catálogo de Insumos</h1>
                    <p className="text-muted-foreground mt-1">Explora materiales, herramientas y suministros certificados por la comunidad.</p>
                </div>
            </div>

            <div className="bg-card/50 p-4 rounded-xl border border-muted/50 backdrop-blur-sm shadow-sm flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar materiales, categorías o proveedores..."
                        className="pl-10 bg-background/50 border-muted/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="bg-background/50 border-muted/50 w-full md:w-64">
                            <SelectValue placeholder="Categoría" />
                        </SelectTrigger>
                        <SelectContent>
                            {categoriesList.map(c => <SelectItem key={c} value={c} className="uppercase text-xs font-bold">{c}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Button
                        variant={isGroupedByProvider ? "default" : "outline"}
                        size="icon"
                        className="bg-background/50 border-muted/50 h-10 w-10 shrink-0"
                        onClick={() => setIsGroupedByProvider(!isGroupedByProvider)}
                        title={isGroupedByProvider ? "Ver lista plana" : "Agrupar por proveedor"}
                    >
                        {isGroupedByProvider ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-primary/50" />
                </div>
            ) : filteredSupplies.length === 0 ? (
                <div className="text-center py-20 bg-card/20 rounded-xl border border-dashed border-muted">
                    <PackageOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-bold text-muted-foreground">No se encontraron insumos</h3>
                    <p className="text-sm text-muted-foreground mt-1">Intenta ajustando los filtros o la búsqueda.</p>
                </div>
            ) : (
                <div className="border border-muted/50 rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm shadow-xl">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow className="border-muted/50">
                                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 pl-6 w-[120px]">ID</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Tipología</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4">Descripción</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 text-center">Unidad</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 text-right">P. Sugerido</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 pl-10">Proveedor</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest py-4 text-right pr-6">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!isGroupedByProvider ? (
                                filteredSupplies.map((supply) => (
                                    <SupplyRow
                                        key={supply.id}
                                        supply={supply}
                                        handleImport={handleImport}
                                        importingId={importingId}
                                    />
                                ))
                            ) : (
                                Object.entries(groupedSupplies || {}).map(([providerName, items]) => (
                                    <React.Fragment key={providerName}>
                                        <TableRow className="bg-muted/10 hover:bg-muted/20 border-muted/50">
                                            <TableCell colSpan={5} className="py-3 pl-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/10 p-1.5 rounded-lg">
                                                        <Users className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-black uppercase tracking-tight">{providerName}</h4>
                                                        <p className="text-[10px] text-muted-foreground font-bold">{items.length} Insumos disponibles</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell colSpan={2} className="text-right py-3 pr-6">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 text-[10px] font-black uppercase border-primary/20 hover:bg-primary hover:text-white transition-all gap-2"
                                                    onClick={() => handleBulkImport(providerName, items.map(i => i.id))}
                                                    disabled={importingProviders.includes(providerName)}
                                                >
                                                    {importingProviders.includes(providerName) ? (
                                                        <Loader2 className="h-3 w-3 animate-spin" />
                                                    ) : (
                                                        <Download className="h-3 w-3" />
                                                    )}
                                                    Importar todo
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        {items.map((supply) => (
                                            <SupplyRow
                                                key={supply.id}
                                                supply={supply}
                                                handleImport={handleImport}
                                                importingId={importingId}
                                                isNested
                                            />
                                        ))}
                                    </React.Fragment>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <div className="bg-muted/10 py-3 text-center border-t border-muted/30">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                            Fin del catálogo ({filteredSupplies.length} registros)
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function SupplyRow({ supply, handleImport, importingId, isNested = false }: { supply: any, handleImport: (id: string) => void, importingId: string | null, isNested?: boolean }) {
    const supplierName = supply.user?.name || supply.costs?.[0]?.supplier?.name || "Sin Registros";
    const displayPrice = supply.price > 0 ? supply.price : (supply.costs?.[0]?.price || 0);
    const shortId = supply.id.substring(supply.id.length - 6).toUpperCase();

    return (
        <TableRow className={`border-muted/30 hover:bg-primary/5 transition-colors group ${isNested ? 'bg-background/40' : ''}`}>
            <TableCell className="font-mono text-[11px] font-bold text-muted-foreground/60 py-4 pl-6 uppercase">
                {shortId}
            </TableCell>
            <TableCell className="py-4">
                <Badge className="bg-black text-white px-3 py-0.5 rounded-full text-[10px] font-black tracking-tighter uppercase border-none hover:bg-black">
                    {supply.typology}
                </Badge>
            </TableCell>
            <TableCell className="font-bold text-sm py-4 max-w-md uppercase tracking-tight">
                {supply.description}
            </TableCell>
            <TableCell className="text-center font-bold text-xs text-muted-foreground/80 py-4 uppercase">
                {supply.unit}
            </TableCell>
            <TableCell className="text-right font-black text-sm py-4 text-primary whitespace-nowrap">
                ${displayPrice.toFixed(2)}
            </TableCell>
            <TableCell className="py-4 pl-10">
                {!isNested && (
                    <span className="text-[10px] font-black uppercase italic text-muted-foreground/40 tracking-wider">
                        {supplierName}
                    </span>
                )}
            </TableCell>
            <TableCell className="text-right py-4 pr-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-all">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-card border-muted/50 backdrop-blur-md">
                        <DropdownMenuItem
                            onClick={() => handleImport(supply.id)}
                            disabled={importingId === supply.id}
                            className="flex items-center gap-2 font-bold text-xs uppercase cursor-pointer"
                        >
                            {importingId === supply.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <Download className="h-3.5 w-3.5 text-primary" />
                            )}
                            Importar a mi biblioteca
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center gap-2 font-bold text-xs uppercase cursor-pointer"
                        >
                            <ShoppingCart className="h-3.5 w-3.5 text-muted-foreground" />
                            Contactar Proveedor
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center gap-2 font-bold text-xs uppercase cursor-pointer"
                        >
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                            Ver Detalles
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
