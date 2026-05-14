/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback, useMemo } from 'react';
import {
    getProjectTransactions,
    createProjectTransaction,
    deleteProjectTransaction,
    getProjectById,
    getPurchaseOrders
} from '@/actions';
import {
    ArrowDownLeft,
    ArrowUpRight,
    TrendingUp,
    History,
    Search,
    Loader2,
    DollarSign,
    MoreVertical,
    Trash2,
    Calendar,

    CheckCircle2,
    PieChart,
    Wallet,
    Landmark
} from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import { Badge } from '../../../../components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '../../../../components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import { Label } from '../../../../components/ui/label';
import { useToast } from '../../../../hooks/use-toast';
import { cn } from '../../../../lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '../../../../components/ui/dropdown-menu';

export default function ProjectAccountingPage() {
    const params = useParams();
    const { toast } = useToast();
    const [project, setProject] = useState<any | null>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        amount: '',
        category: 'varios',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    // Credit PO States
    const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
    const [selectedCreditPOId, setSelectedCreditPOId] = useState<string>('none');

    const fetchProjectData = useCallback(async () => {
        const id = params?.id;
        const cleanId = Array.isArray(id) ? id[0] : id;
        if (!cleanId || cleanId === 'undefined') return;

        setIsLoading(true);
        try {
            const [proj, txs, posRes] = await Promise.all([
                getProjectById(cleanId),
                getProjectTransactions(cleanId),
                getPurchaseOrders(cleanId)
            ]);
            setProject(proj);
            setTransactions(txs);
            if (posRes.success) setPurchaseOrders(posRes.orders || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [params?.id]);

    useEffect(() => {
        fetchProjectData();
    }, [fetchProjectData]);

    const financialSummary = useMemo(() => {
        const income = transactions
            .filter(t => t.type === 'ingreso')
            .reduce((acc, t) => acc + t.amount, 0);
        const expense = transactions
            .filter(t => t.type === 'egreso')
            .reduce((acc, t) => acc + t.amount, 0);

        const mainSymbol = project?.config?.mainCurrency || 'BS';
        const secSymbol = project?.config?.secondaryCurrency || 'USD';
        const rate = project?.config?.exchangeRate || 6.96;

        return {
            income,
            expense,
            balance: income - expense,
            mainSymbol,
            secSymbol,
            rate,
            incomeSec: income / (rate || 1),
            expenseSec: expense / (rate || 1),
            balanceSec: (income - expense) / (rate || 1)
        };
    }, [transactions, project]);

    const creditSummary = useMemo(() => {
        const totalCreditPurchases = purchaseOrders
            .filter((po: any) => po.paymentType === 'credito')
            .reduce((acc: number, po: any) => acc + (po.totalAmount || 0), 0);

        const totalCreditPayments = transactions
            .filter(t => t.type === 'egreso' && t.category === 'pago_credito')
            .reduce((acc, t) => acc + t.amount, 0);

        const pendingBalance = totalCreditPurchases - totalCreditPayments;
        const creditPOCount = purchaseOrders.filter((po: any) => po.paymentType === 'credito').length;

        return { totalCreditPurchases, totalCreditPayments, pendingBalance, creditPOCount };
    }, [purchaseOrders, transactions]);

    const handleCreateTransaction = async (type: 'ingreso' | 'egreso') => {
        if (!project || !formData.amount || !formData.description) return;
        setIsSaving(true);
        try {
            const result = await createProjectTransaction({
                projectId: project.id,
                amount: parseFloat(formData.amount),
                type,
                category: formData.category,
                description: formData.description,
                date: formData.date
            });

            if (result.success) {
                toast({ title: "Movimiento Registrado", description: `Se ha asentado el ${type} correctamente.` });
                setIsIncomeModalOpen(false);
                setIsExpenseModalOpen(false);
                setFormData({ amount: '', category: 'varios', description: '', date: new Date().toISOString().split('T')[0] });
                setSelectedCreditPOId('none');
                fetchProjectData();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteTx = async (id: string) => {
        if (!confirm('¿Eliminar este registro financiero?')) return;
        try {
            const result = await deleteProjectTransaction(id);
            if (result.success) {
                toast({ title: "Registro eliminado" });
                fetchProjectData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center gap-6">
                <div className="relative">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <div className="absolute inset-0  animate-pulse" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Sincronizando Tesoreria...</p>
            </div>
        );
    }

    if (!project) return null;

    return (
        <div className="space-y-10 p-10 pb-20 max-w-[1900px] mx-auto animate-in fade-in duration-700">
            {/* Financial Summary KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <Card className="bg-card border-accent/20 relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp className="h-20 w-20 text-emerald-500" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Recaudación Total</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-black text-emerald-500 opacity-40 font-mono">{financialSummary.mainSymbol}</span>
                                <p className="text-4xl font-black text-primary tracking-tighter">
                                    {financialSummary.income.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{financialSummary.secSymbol}</span>
                                <span className="text-[14px] font-mono font-black text-emerald-500/40">
                                    {financialSummary.incomeSec.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                <Card className="bg-card border-accent/20 relative overflow-hidden group hover:border-red-500/40 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <ArrowUpRight className="h-20 w-20 text-red-500" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-widest text-red-500">Egresos Ejecutados</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-black text-red-500 opacity-40 font-mono">{financialSummary.mainSymbol}</span>
                                <p className="text-4xl font-black text-primary tracking-tighter">
                                    {financialSummary.expense.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{financialSummary.secSymbol}</span>
                                <span className="text-[14px] font-mono font-black text-red-500/40">
                                    {financialSummary.expenseSec.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                <Card className={cn("relative overflow-hidden border-accent/20 md:col-span-2 group transition-all duration-500 py-2",
                    financialSummary.balance >= 0 ? "hover:border-primary/40" : "bg-card border-red-500/20")}>
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <PieChart className="h-24 w-24 text-primary" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Flujo de Caja Neto (Disponibilidad)</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl font-black opacity-20 font-mono">{financialSummary.mainSymbol}</span>
                                <p className={cn("text-5xl font-black tracking-tighter",
                                    financialSummary.balance >= 0 ? "text-primary" : "text-red-500")}>
                                    {financialSummary.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{financialSummary.secSymbol}</span>
                                    <span className={cn("text-xl font-mono font-black", financialSummary.balance >= 0 ? "text-primary/40" : "text-red-500/40")}>
                                        {financialSummary.balanceSec.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1 border-none",
                                    financialSummary.balance >= 0 ? "bg-card text-primary" : "bg-card text-red-500")}>
                                    {financialSummary.balance >= 0 ? "Rentabilidad Positiva" : "Déficit Unitario"}
                                </Badge>
                            </div>
                        </div>
                        <div className="text-right border-l border-accent/20/30 pl-8 ml-auto">
                            <p className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.2em] mb-1">T. Cambio</p>
                            <p className="text-xl font-mono font-black text-primary/60">{financialSummary.rate.toFixed(2)}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Compras a Crédito */}
                <Card className="bg-card border-accent/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Landmark className="h-20 w-20 text-amber-500" />
                    </div>
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-widest text-amber-500">Compras a Crédito</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex flex-row justify-between">
                            <div className="flex items-baseline gap-2">
                                <div className='flex flex-col'>
                                    <span className="text-xl font-black text-amber-500 opacity-40 font-mono">{financialSummary.mainSymbol}</span>
                                    <p className="text-3xl font-black text-primary tracking-tighter">
                                        {creditSummary.totalCreditPurchases.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </p>
                                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                                        {creditSummary.creditPOCount} orden{creditSummary.creditPOCount !== 1 ? 'es' : ''} a crédito
                                    </span>
                                </div>
                            </div>
                            <div className="border-t border-accent/20/50 pt-3 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Pagado</span>
                                    <span className="text-[13px] font-mono font-black text-emerald-500">
                                        {creditSummary.totalCreditPayments.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Saldo</span>
                                    <span className={cn("text-[15px] font-mono font-black",
                                        creditSummary.pendingBalance <= 0 ? "text-emerald-500" : "text-red-500")}>
                                        {creditSummary.pendingBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>

            {/* Transactions Table Section */}
            <div className="space-y-6">
                <Card className="bg-card border-accent/20 overflow-hidden gap-0">
                    <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 pb-7 border-b border-accent/20">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/20 rounded-lg">
                                <History className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex flex-col">
                                <CardTitle className="text-lg font-bold uppercase tracking-tight">Libro de Transacciones</CardTitle>
                                <CardDescription className="text-muted-foreground text-[10px] font-black uppercase tracking-widest mt-1">Registro cronológico de movimientos financieros en el proyecto.</CardDescription>
                            </div>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="BUSCAR POR CONCEPTO..."
                                className="pl-10 h-11 bg-card border-accent/20 text-[11px] font-bold uppercase rounded-xl focus-visible:ring-primary/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                className="bg-emerald-500 hover:bg-emerald-600 text-black font-black text-[10px] uppercase tracking-widest px-8 h-12 rounded-xl active:scale-95 transition-all"
                                onClick={() => setIsIncomeModalOpen(true)}
                            >
                                <ArrowDownLeft className="mr-2 h-4 w-4" /> Registrar Ingreso
                            </Button>
                            <Button
                                className="bg-red-500 hover:bg-red-600 text-white font-black text-[10px] uppercase tracking-widest px-8 h-12 rounded-xl active:scale-95 transition-all"
                                onClick={() => setIsExpenseModalOpen(true)}
                            >
                                <ArrowUpRight className="mr-2 h-4 w-4" /> Registrar Egreso
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-accent/20">
                                <TableRow className="border-accent/20 hover:bg-transparent">
                                    <TableHead className="py-5 px-8 text-[10px] font-black uppercase tracking-widest text-primary">Fecha / Registro</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase text-primary">Categoría</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase text-primary">Descripción / Concepto</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase text-right pr-12 text-primary">Importe ({financialSummary.mainSymbol})</TableHead>
                                    <TableHead className="w-16" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.length > 0 ? (
                                    transactions
                                        .filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((t) => (
                                            <TableRow key={t.id} className="border-accent/20 hover:bg-accent/40 transition-colors group">
                                                <TableCell className="py-6 px-8">
                                                    <div className="flex items-center gap-3">
                                                        <Calendar className="h-3 w-3 text-muted-foreground" />
                                                        <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase">{t.date}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-primary/20 bg-primary/5 px-3 py-1">
                                                        {t.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm font-black text-primary uppercase leading-tight tracking-tight">{t.description}</span>
                                                        <div className={cn("text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5",
                                                            t.type === 'ingreso' ? "text-emerald-500" : "text-red-500")}>
                                                            {t.type === 'ingreso' ? <ArrowDownLeft className="h-2.5 w-2.5" /> : <ArrowUpRight className="h-2.5 w-2.5" />}
                                                            {t.type === 'ingreso' ? 'ENTRADA DE FONDOS' : 'SALIDA DE CAJA'}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right pr-12">
                                                    <div className="flex flex-col items-end">
                                                        <span className={cn("font-mono text-xl font-black tracking-tighter",
                                                            t.type === 'ingreso' ? "text-emerald-500" : "text-red-500")}>
                                                            {t.type === 'ingreso' ? '+' : '-'}{t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                        </span>
                                                        <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{financialSummary.mainSymbol}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="pr-4">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="bg-card border-accent/20 text-primary p-2 rounded-xl ">
                                                            <DropdownMenuItem onClick={() => handleDeleteTx(t.id)} className="text-[10px] font-black uppercase text-red-500 focus:bg-red-500/10 cursor-pointer py-3 rounded-lg">
                                                                <Trash2 className="mr-3 h-4 w-4" /> Eliminar Registro
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-40 border border-dashed border-accent/20 m-4 rounded-2xl">
                                            <div className="flex flex-col items-center gap-3 opacity-30">
                                                <Wallet className="h-12 w-12" />
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em]">No se registran transacciones conciliadas.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Transaction Modals */}
            <Dialog
                open={isIncomeModalOpen || isExpenseModalOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsIncomeModalOpen(false);
                        setIsExpenseModalOpen(false);
                        setSelectedCreditPOId('none');
                    }
                }}
            >
                <DialogContent className="min-w-5xl bg-card border-accent/20 text-primary p-0 overflow-hidden  rounded-3xl">
                    <DialogHeader className="p-8 border-b border-accent/20 bg-card">
                        <div className="flex items-center gap-4">
                            <div className={cn("p-3 rounded-2xl", isIncomeModalOpen ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500")}>
                                {isIncomeModalOpen ? <ArrowDownLeft className="h-7 w-7" /> : <ArrowUpRight className="h-7 w-7" />}
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-black uppercase tracking-tight">
                                    {isIncomeModalOpen ? 'Asentar Ingreso' : 'Asentar Egreso'}
                                </DialogTitle>
                                <DialogDescription className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-1">
                                    Registro de flujo de fondos para el control presupuestario
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-primary/60">Importe Total (USD)</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground opacity-40" />
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={formData.amount}
                                        onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                                        className="h-14 pl-12 bg-card border-accent/20 font-mono text-2xl font-black text-primary rounded-xl focus-visible:ring-primary/10"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-primary/60">Fecha de Operación</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground opacity-40" />
                                    <Input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                        className="h-14 pl-12 bg-card border-accent/20 text-sm font-mono font-bold rounded-xl active:bg-accent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-primary/60">Clasificación Contable</Label>
                            <Select value={formData.category} onValueChange={(v) => {
                                setFormData(prev => ({ ...prev, category: v }));
                                if (v !== 'pago_credito') setSelectedCreditPOId('none');
                            }}>
                                <SelectTrigger className="h-14 bg-card border-accent/20 uppercase text-[11px] font-black tracking-widest rounded-xl hover:bg-accent transition-colors">
                                    <SelectValue placeholder="Seleccione Categoría..." />
                                </SelectTrigger>
                                <SelectContent className="bg-card text-primary border-accent/20 p-2 rounded-xl">
                                    {isIncomeModalOpen ? (
                                        <>
                                            <SelectItem value="certificacion" className="text-[10px] font-bold uppercase py-3 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-500">Certificación de Obra</SelectItem>
                                            <SelectItem value="adelanto" className="text-[10px] font-bold uppercase py-3 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-500">Adelanto de Cliente</SelectItem>
                                            <SelectItem value="financiamiento" className="text-[10px] font-bold uppercase py-3 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-500">Financiamiento Externo</SelectItem>
                                            <SelectItem value="varios" className="text-[10px] font-bold uppercase py-3 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-500">Otros Ingresos</SelectItem>
                                        </>
                                    ) : (
                                        <>
                                            <SelectItem value="materiales" className="text-[10px] font-bold uppercase py-3 rounded-lg focus:bg-red-500/10 focus:text-red-500">Adquisición de Materiales</SelectItem>
                                            <SelectItem value="planillas" className="text-[10px] font-bold uppercase py-3 rounded-lg focus:bg-red-500/10 focus:text-red-500">Pago de Nómina / Planillas</SelectItem>
                                            <SelectItem value="honorarios" className="text-[10px] font-bold uppercase py-3 rounded-lg focus:bg-red-500/10 focus:text-red-500">Honorarios y Servicios</SelectItem>
                                            <SelectItem value="servicios" className="text-[10px] font-bold uppercase py-3 rounded-lg focus:bg-red-500/10 focus:text-red-500">Servicios Generales</SelectItem>
                                            <SelectItem value="pago_credito" className="text-[10px] font-bold uppercase py-3 rounded-lg focus:bg-amber-500/10 focus:text-amber-500">Pago de Compra a Crédito</SelectItem>
                                            <SelectItem value="varios" className="text-[10px] font-bold uppercase py-3 rounded-lg focus:bg-red-500/10 focus:text-red-500">Gastos Varios de Obra</SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Credit PO selector — only shown for egreso + pago_credito */}
                        {isExpenseModalOpen && formData.category === 'pago_credito' && (
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-primary/60">Orden de Compra a Crédito</Label>
                                {purchaseOrders.filter((po: any) => po.paymentType === 'credito').length === 0 ? (
                                    <div className="h-14 flex items-center px-6 border border-dashed border-accent/20 rounded-xl text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                        No hay órdenes de compra a crédito registradas.
                                    </div>
                                ) : (
                                    <Select
                                        value={selectedCreditPOId}
                                        onValueChange={(poId) => {
                                            setSelectedCreditPOId(poId);
                                            if (poId === 'none') return;
                                            const po = purchaseOrders.find((p: any) => p.id === poId);
                                            if (!po) return;
                                            const supplierName = po.supplier?.company || po.supplier?.name || 'PROVEEDOR';
                                            setFormData(prev => ({
                                                ...prev,
                                                amount: po.totalAmount.toString(),
                                                description: `PAGO OC ${po.number} — ${supplierName}`
                                            }));
                                        }}
                                    >
                                        <SelectTrigger className="h-auto min-h-14 bg-card border-accent/20 text-[11px] font-black tracking-widest rounded-xl hover:bg-accent transition-colors py-3">
                                            <SelectValue placeholder="Seleccione la orden de compra..." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-card text-primary border-accent/20 p-2 rounded-xl">
                                            <SelectItem value="none" className="text-[10px] font-bold uppercase py-3 rounded-lg">— Seleccionar OC —</SelectItem>
                                            {purchaseOrders
                                                .filter((po: any) => po.paymentType === 'credito')
                                                .map((po: any) => (
                                                    <SelectItem key={po.id} value={po.id} className="text-[10px] font-bold uppercase py-3 rounded-lg focus:bg-amber-500/10 focus:text-amber-500">
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="font-black">{po.number} — {po.supplier?.company || po.supplier?.name || 'PROVEEDOR VARIOS'}</span>
                                                            <span className="text-muted-foreground font-bold">
                                                                Total: $ {Number(po.totalAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                                {po.dueDate ? ` · Vence: ${new Date(po.dueDate).toLocaleDateString('es-ES')}` : ''}
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                )}
                                {selectedCreditPOId !== 'none' && (() => {
                                    const po = purchaseOrders.find((p: any) => p.id === selectedCreditPOId);
                                    if (!po) return null;
                                    return (
                                        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-center justify-between gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-amber-500/70">Proveedor</span>
                                                <span className="text-sm font-black text-primary uppercase">{po.supplier?.company || po.supplier?.name || '—'}</span>
                                                {po.supplier?.nit && <span className="text-[9px] text-muted-foreground font-mono">NIT: {po.supplier.nit}</span>}
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-amber-500/70 block">Monto Total OC</span>
                                                <span className="text-xl font-black font-mono text-amber-500">$ {Number(po.totalAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                                {po.dueDate && (
                                                    <span className="text-[9px] text-muted-foreground font-bold block mt-0.5">Vence: {new Date(po.dueDate).toLocaleDateString('es-ES')}</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        )}

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-primary/60">Descripción / Glosa</Label>
                            <Input
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                className="h-14 bg-card border-accent/20 text-sm uppercase font-black px-6 rounded-xl placeholder:text-muted-foreground/30"
                                placeholder="DETALLE EL CONCEPTO DEL MOVIMIENTO..."
                            />
                        </div>
                    </div>

                    <DialogFooter className="p-8 border-t border-accent/20 bg-card gap-4">
                        <Button variant="ghost" onClick={() => { setIsIncomeModalOpen(false); setIsExpenseModalOpen(false); setSelectedCreditPOId('none'); }} className="text-[11px] font-black uppercase tracking-widest px-8 h-14 hover:bg-red-500/10 hover:text-red-500">Cancelar Operación</Button>
                        <Button
                            variant="default"
                            onClick={() => handleCreateTransaction(isIncomeModalOpen ? 'ingreso' : 'egreso')}
                            disabled={isSaving || !formData.amount || !formData.description}
                            className={cn("font-black uppercase text-[11px] h-14 px-12  rounded-xl transition-all active:scale-95",
                                isIncomeModalOpen ? "bg-emerald-500 hover:bg-emerald-600 text-black shadow-emerald-500/20" : "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20")}
                        >
                            {isSaving ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <CheckCircle2 className="mr-3 h-5 w-5" />}
                            Confirmar Registro {isIncomeModalOpen ? 'Ingreso' : 'Egreso'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
