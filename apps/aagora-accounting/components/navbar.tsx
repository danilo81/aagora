"use client";

import {
    Menu, HardHat, Handshake, PenTool, Globe, Palette,
    Inbox, BellIcon, Loader2, Trash2, CheckSquare,
    CalendarIcon, PlusCircle, Calendar, Save,
    Library, HardDrive, CreditCard, LayoutDashboard
} from "lucide-react";
import { UserButton, OrganizationSwitcher, useUser } from "@clerk/nextjs";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import Logo from "@workspace/ui/components/logo";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@workspace/ui/components/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@workspace/ui/components/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@workspace/ui/components/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { CommunitySettings } from "./auth/CommunitySettings";
import { AppearanceSettings } from "./auth/AppearanceSettings";
import { StorageSettings } from "./auth/StorageSettings";
import { SubscriptionSettings } from "./auth/SubscriptionSettings";
import { AiChatModal } from "@workspace/ui/components/IAChatModal";

// Inbox Actions
import {
    getNotifications,
    markAsRead,
    deleteNotification,
    getTasks,
    createTask,
    deleteTask,
    getUpcomingEvents,
    getInboxSummary
} from "@/actions/inbox";
import { createCalendarEvent } from "@/actions/calendar/createCalendarEvent";
import { deleteCalendarEvent } from "@/actions/calendar/deleteCalendarEvent";
import { getProjects } from "@/actions/general/getProjects";

const CORE_URL = process.env.NEXT_PUBLIC_CORE_URL ?? "http://localhost:3000";
const CONSTRUCTION_URL = process.env.NEXT_PUBLIC_CONSTRUCTION_URL ?? "http://localhost:3003";
const COMMUNITY_URL = process.env.NEXT_PUBLIC_COMMUNITY_URL ?? "http://localhost:3002";
const DESIGN_URL = process.env.NEXT_PUBLIC_DESIGN_URL ?? "http://localhost:3004";
const WORKSPACE_URL = process.env.NEXT_PUBLIC_WORKSPACE_URL ?? "http://localhost:3005";

interface InboxNotification { id: string; title: string; message: string; isRead: boolean; createdAt: Date | string; }
interface InboxTask { id: string; title: string; status: string; priority: string; description?: string | null; }
interface InboxEvent { id: string; title: string; project?: string | null; }
interface InboxSummary { hasUpdates: boolean; totalUnread: number; notificationsCount?: number; tasksCount?: number; }

export function Navbar() {
    const { user } = useUser();
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Inbox States
    const [notifications, setNotifications] = useState<InboxNotification[]>([]);
    const [tasks, setTasks] = useState<InboxTask[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<InboxEvent[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [pendingTasksCount, setPendingTasksCount] = useState(0);
    const [inboxSummary, setInboxSummary] = useState<InboxSummary>({ hasUpdates: false, totalUnread: 0 });
    const [isFetchingInbox, setIsFetchingInbox] = useState(false);
    const [hasFetchedInbox, setHasFetchedInbox] = useState(false);

    // Create modals
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isSubmittingQuick, setIsSubmittingQuick] = useState(false);
    const [projects, setProjects] = useState<{ id: string; title: string }[]>([]);

    const [taskForm, setTaskForm] = useState({ title: '', projectId: '', priority: 'media', dueDate: '', description: '' });
    const [eventForm, setEventForm] = useState({ title: '', projectId: '', dueDate: '', description: '' });

    useEffect(() => { setMounted(true); }, []);

    const fetchInboxData = useCallback(async () => {
        if (!user?.id) return;
        setIsFetchingInbox(true);
        try {
            const [notifs, tks, evts, summary] = await Promise.all([
                getNotifications(),
                getTasks(),
                getUpcomingEvents(),
                getInboxSummary()
            ]) as [InboxNotification[], InboxTask[], InboxEvent[], InboxSummary];
            setNotifications(notifs);
            setTasks(tks);
            setUpcomingEvents(evts);
            setInboxSummary(summary);
            setUnreadCount(notifs.filter(n => !n.isRead).length);
            setPendingTasksCount(tks.filter(t => t.status !== 'completado').length);
            setHasFetchedInbox(true);
        } catch (error) {
            console.error("Error fetching inbox data:", error);
        } finally {
            setIsFetchingInbox(false);
        }
    }, [user?.id]);

    useEffect(() => {
        if (mounted && user?.id) {
            getInboxSummary().then(setInboxSummary);
        }
    }, [mounted, user?.id]);

    const handleMarkAsRead = async (id: string) => {
        const res = await markAsRead(id);
        if (res.success) {
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        }
    };

    const handleDeleteNotification = async (id: string) => {
        const res = await deleteNotification(id);
        if (res.success) {
            const wasUnread = notifications.find(n => n.id === id)?.isRead === false;
            setNotifications(prev => prev.filter(n => n.id !== id));
            if (wasUnread) setUnreadCount(prev => Math.max(0, prev - 1));
        }
    };

    const handleDeleteTask = async (id: string) => {
        const res = await deleteTask(id);
        if (res.success) {
            setTasks(prev => prev.filter(t => t.id !== id));
            setPendingTasksCount(prev => Math.max(0, prev - 1));
        }
    };

    const handleDeleteEvent = async (id: string) => {
        const res = await deleteCalendarEvent(id);
        if (res.success) setUpcomingEvents(prev => prev.filter(e => e.id !== id));
    };

    const openTaskModal = async () => {
        setTaskForm({ title: '', projectId: '', priority: 'media', dueDate: '', description: '' });
        if (projects.length === 0) setProjects(await getProjects());
        setIsTaskModalOpen(true);
    };

    const openEventModal = async () => {
        setEventForm({ title: '', projectId: '', dueDate: '', description: '' });
        if (projects.length === 0) setProjects(await getProjects());
        setIsEventModalOpen(true);
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskForm.title.trim()) return;
        setIsSubmittingQuick(true);
        const res = await createTask({
            title: taskForm.title.trim(),
            status: 'pendiente',
            priority: taskForm.priority,
            dueDate: taskForm.dueDate || null,
            projectId: taskForm.projectId || null,
            assignee: null,
        });
        setIsSubmittingQuick(false);
        if (res.success) {
            setIsTaskModalOpen(false);
            fetchInboxData();
        }
    };

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!eventForm.title.trim() || !eventForm.dueDate) return;
        setIsSubmittingQuick(true);
        const res = await createCalendarEvent({
            title: eventForm.title.trim(),
            date: eventForm.dueDate,
            type: 'reunion',
            description: eventForm.description || '',
            project: projects.find(p => p.id === eventForm.projectId)?.title ?? '',
        });
        setIsSubmittingQuick(false);
        if (res.success) {
            setIsEventModalOpen(false);
            fetchInboxData();
        }
    };

    if (!mounted) return (
        <nav className="h-14 border-b border-border bg-background/50 flex items-center px-4 justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4"><div className="size-7" /></div>
        </nav>
    );

    return (
        <>
        <nav className="h-14 border-b md:border-2 md:border-foreground/10 bg-card flex items-center px-2 md:px-4 justify-between sticky top-0 md:rounded-lg md:m-3 shadow-sm md:shadow-none z-40">
            <div className="flex items-center gap-2 md:gap-6">

                {/* MENÚ MÓVIL (SHEET) */}
                <div className="block lg:hidden">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-primary">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[85vw] max-w-[350px] bg-card border-accent p-0 flex flex-col">
                            <SheetHeader className="p-4 border-b border-accent text-left">
                                <SheetDescription />
                                <SheetTitle className="text-lg font-black uppercase tracking-tighter text-primary flex items-center gap-2">
                                    <Link href='/'><Logo size={32} /></Link>
                                    AAGORA
                                </SheetTitle>
                            </SheetHeader>
                            <ScrollArea className="flex-1 pb-4 h-[600px]">
                                <div className="p-4 space-y-6">
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Módulos Globales</p>
                                        <a href={`${CORE_URL}/`} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-primary/10 text-primary transition-colors">
                                            <Library className="h-5 w-5" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Libreria</span>
                                        </a>
                                        <a href={CONSTRUCTION_URL} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-primary/10 text-primary transition-colors">
                                            <HardHat className="h-5 w-5" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Construction</span>
                                        </a>
                                        <a href={COMMUNITY_URL} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-primary/10 text-primary transition-colors">
                                            <Handshake className="h-5 w-5" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Comunidad</span>
                                        </a>
                                        <a href={DESIGN_URL} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-primary/10 text-primary transition-colors">
                                            <PenTool className="h-5 w-5" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Diseño</span>
                                        </a>
                                    </div>
                                </div>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </div>

                <Link href="/" className="items-center space-x-2 mr-2 md:mr-4 cursor-pointer hidden md:flex">
                    <div><Logo className='h-10 w-10 md:h-10 md:w-10' /></div>
                    <span className="text-lg font-black tracking-tighter font-headline text-primary uppercase hidden sm:block">AA<span className="text-primary/50">GOR</span><span className="text-primary">A</span></span>
                </Link>

                {/* MENÚ ESCRITORIO */}
                <div className="hidden lg:flex items-center gap-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-muted-foreground text-[10px] font-black uppercase tracking-widest hover:bg-secondary">
                                    <Menu className="h-6 w-6" />
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150 bg-card border ring-accent/10 h-fit rounded-2xl shadow-lg">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a className="flex h-full w-full select-none flex-col justify-end rounded-md from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md hover:bg-secondary" href={`${CORE_URL}/`}>
                                                    <LayoutDashboard className="h-20 w-20 text-primary" />
                                                    <div className="flex flex-col gap-0">
                                                        <div className="mb-2 mt-4 text-lg font-black uppercase tracking-tighter text-primary">Dashboard</div>
                                                        <p className="text-[10px] leading-tight text-muted-foreground font-bold uppercase">Panel de control global</p>
                                                    </div>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <li>
                                            <a href={CONSTRUCTION_URL} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary">
                                                <div className="flex flex-col gap-2">
                                                    <div className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2"><HardHat className="h-3.5 w-3.5" /> Construction</div>
                                                    <p className="line-clamp-2 text-[9px] font-bold uppercase text-muted-foreground">Gestión de obra y presupuesto.</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={COMMUNITY_URL} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary">
                                                <div className="flex flex-col gap-2">
                                                    <div className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2"><Handshake className="h-3.5 w-3.5" /> Comunidad</div>
                                                    <p className="line-clamp-2 text-[9px] font-bold uppercase text-muted-foreground">Interacción y colaboración entre usuarios.</p>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={DESIGN_URL} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary">
                                                <div className='flex flex-col gap-2'>
                                                    <div className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2"><PenTool className="h-3.5 w-3.5" /> Diseño</div>
                                                    <p className="line-clamp-2 text-[9px] font-bold uppercase text-muted-foreground">Herramientas de diseño y modelado.</p>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
                <div className="flex items-center gap-2">

                    {/* IA CHAT BUTTON */}
                    <AiChatModal />

                    {/* INBOX / NOTIFICACIONES DROPDOWN */}
                    <DropdownMenu onOpenChange={(open) => {
                        if (open && !hasFetchedInbox) {
                            fetchInboxData();
                        }
                    }}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative h-9 w-9 rounded-xl hover:bg-secondary transition-all cursor-pointer">
                                <Inbox className="h-4.5 w-4.5" />
                                {inboxSummary.hasUpdates && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-black rounded-full h-3.5 w-3.5 flex items-center justify-center border-2 border-card">
                                        {inboxSummary.totalUnread}
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[calc(100vw-1rem)] sm:w-96 bg-card border-accent/20 text-primary p-0 overflow-hidden rounded-xl shadow-2xl">
                            <Tabs defaultValue="notifications" className="w-full gap-0">
                                <div className="p-4 bg-card border-b border-accent/10 flex flex-col gap-4">
                                    <div className="flex items-center justify-between px-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Bandeja Área de trabajo</span>
                                    </div>
                                    <TabsList className="grid grid-cols-3 h-10 bg-transparent border border-accent/20 p-1 rounded-xl w-full">
                                        <TabsTrigger value="notifications" className="relative text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 data-[state=active]:bg-accent/10 data-[state=active]:border data-[state=active]:border-accent/20">
                                            Notificaciones
                                            {unreadCount > 0 && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 animate-pulse" />}
                                        </TabsTrigger>
                                        <TabsTrigger value="tasks" className="relative text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 data-[state=active]:bg-accent/10 data-[state=active]:border data-[state=active]:border-accent/20">
                                            Tareas
                                            {pendingTasksCount > 0 && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 animate-pulse" />}
                                        </TabsTrigger>
                                        <TabsTrigger value="events" className="relative text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 data-[state=active]:bg-accent/10 data-[state=active]:border data-[state=active]:border-accent/20">
                                            Eventos
                                            {upcomingEvents.length > 0 && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 animate-pulse" />}
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                                <ScrollArea className="h-[50vh] sm:h-80">
                                    {/* TAB NOTIFICACIONES */}
                                    <TabsContent value="notifications" className="m-0 border-none outline-none">
                                        {isFetchingInbox && !hasFetchedInbox ? (
                                            <div className="flex flex-col items-center justify-center h-48 gap-2 opacity-30">
                                                <Loader2 className="h-6 w-6 animate-spin" />
                                                <span className="text-[8px] font-black uppercase">Cargando...</span>
                                            </div>
                                        ) : notifications.length > 0 ? (
                                            <div className="flex flex-col">
                                                {notifications.map((n) => (
                                                    <div key={n.id} className={cn("p-4 border-b border-accent/10 last:border-0 hover:bg-secondary transition-colors relative group", !n.isRead && "bg-primary/5")}>
                                                        <div className="flex gap-3">
                                                            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                                                <BellIcon className="h-4 w-4 text-primary" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex justify-between items-start">
                                                                    <p className="text-[11px] font-bold uppercase leading-tight truncate pr-4">{n.title}</p>
                                                                    <button onClick={() => handleDeleteNotification(n.id)} className="opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" /></button>
                                                                </div>
                                                                <p className="text-[10px] text-muted-foreground leading-relaxed mt-1">{n.message}</p>
                                                            </div>
                                                        </div>
                                                        {!n.isRead && <button onClick={() => handleMarkAsRead(n.id)} className="absolute right-4 bottom-3 text-[9px] font-black uppercase text-primary hover:underline">Leído</button>}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-64 opacity-20"><BellIcon className="h-10 w-10" /><span className="text-[10px] font-black uppercase">Sin novedades</span></div>
                                        )}
                                    </TabsContent>

                                    {/* TAB TAREAS */}
                                    <TabsContent value="tasks" className="m-0 border-none outline-none">
                                        {isFetchingInbox && !hasFetchedInbox ? (
                                            <div className="flex flex-col items-center justify-center h-48 gap-2 opacity-30">
                                                <Loader2 className="h-6 w-6 animate-spin" />
                                                <span className="text-[8px] font-black uppercase">Cargando...</span>
                                            </div>
                                        ) : tasks.length > 0 ? (
                                            <div className="flex flex-col">
                                                {tasks.map((t) => (
                                                    <div key={t.id} className="p-4 border-b border-accent/10 last:border-0 hover:bg-secondary transition-colors group">
                                                        <div className="flex gap-3">
                                                            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                                                <CheckSquare className="h-4 w-4 text-primary" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex justify-between items-start">
                                                                    <p className="text-[11px] font-bold uppercase leading-tight truncate pr-4">{t.title}</p>
                                                                    <button onClick={() => handleDeleteTask(t.id)} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"><Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" /></button>
                                                                </div>
                                                                <div className="flex items-center gap-2 mt-2">
                                                                    <Badge variant="outline" className="text-[8px] h-4.5 font-black uppercase px-2">{t.status}</Badge>
                                                                    <Badge variant="outline" className="text-[8px] h-4.5 font-black uppercase text-amber-500 border-amber-500/20 px-2">{t.priority}</Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-64 opacity-20"><CheckSquare className="h-10 w-10" /><span className="text-[10px] font-black uppercase">Sin tareas pendientes</span></div>
                                        )}
                                    </TabsContent>

                                    {/* TAB EVENTOS */}
                                    <TabsContent value="events" className="m-0 border-none outline-none">
                                        {isFetchingInbox && !hasFetchedInbox ? (
                                            <div className="flex flex-col items-center justify-center h-48 gap-2 opacity-30">
                                                <Loader2 className="h-6 w-6 animate-spin" />
                                                <span className="text-[8px] font-black uppercase">Cargando...</span>
                                            </div>
                                        ) : upcomingEvents.length > 0 ? (
                                            <div className="flex flex-col">
                                                {upcomingEvents.map((e) => (
                                                    <div key={e.id} className="p-4 border-b border-accent/10 last:border-0 hover:bg-secondary transition-colors group">
                                                        <div className="flex gap-3">
                                                            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                                                                <CalendarIcon className="h-4 w-4 text-primary" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex justify-between items-start">
                                                                    <p className="text-[11px] font-bold uppercase leading-tight truncate pr-4">{e.title}</p>
                                                                    <button onClick={() => handleDeleteEvent(e.id)} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"><Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" /></button>
                                                                </div>
                                                                <p className="text-[10px] text-muted-foreground mt-1">{e.project || 'Evento general'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-64 opacity-20"><CalendarIcon className="h-10 w-10" /><span className="text-[10px] font-black uppercase">Sin eventos próximos</span></div>
                                        )}
                                    </TabsContent>
                                </ScrollArea>

                                {/* BOTTOM BUTTONS */}
                                <div className="p-4 bg-card border-t border-accent/10 text-center flex flex-col gap-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            variant="outline"
                                            className="text-[9px] font-black uppercase tracking-widest h-10 border-accent/20 bg-transparent text-primary hover:bg-primary/5 cursor-pointer rounded-lg"
                                            onClick={openTaskModal}
                                        >
                                            <PlusCircle className="mr-2 h-4 w-4" /> Tarea
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="text-[9px] font-black uppercase tracking-widest h-10 border-accent/20 bg-transparent text-primary hover:bg-primary/5 cursor-pointer rounded-lg"
                                            onClick={openEventModal}
                                        >
                                            <Calendar className="mr-2 h-4 w-4" /> Evento
                                        </Button>
                                    </div>
                                    <Button
                                        variant="default"
                                        className="w-full text-[10px] font-black uppercase tracking-widest h-10 rounded-lg bg-primary text-background hover:opacity-90 cursor-pointer"
                                        onClick={() => window.location.href = WORKSPACE_URL}
                                    >
                                        Abrir Área de Trabajo
                                    </Button>
                                </div>
                            </Tabs>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <OrganizationSwitcher
                        appearance={{
                            elements: {
                                rootBox: "hidden sm:flex"
                            }
                        }}
                    >
                        <OrganizationSwitcher.OrganizationProfilePage
                            label="Comunidad"
                            url="community"
                            labelIcon={<Globe className="h-4 w-4" />}
                        >
                            <CommunitySettings type="organization" />
                        </OrganizationSwitcher.OrganizationProfilePage>
                    </OrganizationSwitcher>

                    <UserButton>
                        <UserButton.UserProfilePage
                            label="Comunidad"
                            url="community"
                            labelIcon={<Globe className="h-4 w-4" />}
                        >
                            <CommunitySettings type="user" />
                        </UserButton.UserProfilePage>
                        <UserButton.UserProfilePage
                            label="Apariencia"
                            url="appearance"
                            labelIcon={<Palette className="h-4 w-4" />}
                        >
                            <AppearanceSettings />
                        </UserButton.UserProfilePage>
                        <UserButton.UserProfilePage
                            label="Almacenamiento"
                            url="storage"
                            labelIcon={<HardDrive className="h-4 w-4" />}
                        >
                            <StorageSettings />
                        </UserButton.UserProfilePage>
                        <UserButton.UserProfilePage
                            label="Suscripción"
                            url="subscription"
                            labelIcon={<CreditCard className="h-4 w-4" />}
                        >
                            <SubscriptionSettings />
                        </UserButton.UserProfilePage>
                    </UserButton>
                </div>
            </div>
        </nav>

        {/* Modal Crear Tarea */}
        <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
            <DialogContent className="max-w-md bg-card border-accent text-primary p-0 overflow-hidden">
                <form onSubmit={handleCreateTask}>
                    <DialogHeader className="p-6 bg-card border-b border-accent shrink-0 flex flex-row items-center space-y-0 gap-3">
                        <CheckSquare className="h-6 w-6 text-primary" />
                        <div>
                            <DialogTitle className="text-xl font-bold uppercase tracking-tight">Crear Nueva Tarea</DialogTitle>
                            <DialogDescription className="text-muted-foreground text-[10px] font-black uppercase mt-1">Asigna actividades a tu equipo</DialogDescription>
                        </div>
                    </DialogHeader>
                    <div className="p-6 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Título de la Tarea</Label>
                            <Input value={taskForm.title} onChange={(e) => setTaskForm(p => ({ ...p, title: e.target.value }))} placeholder="EJ: REVISIÓN DE FACTURAS" required className="h-11 bg-card border-accent uppercase font-bold text-xs" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Proyecto</Label>
                                <Select value={taskForm.projectId} onValueChange={(val) => setTaskForm(p => ({ ...p, projectId: val }))}>
                                    <SelectTrigger className="h-11 bg-card border-accent uppercase font-black text-[9px]"><SelectValue placeholder="SELECCIONAR" /></SelectTrigger>
                                    <SelectContent className="bg-card text-primary border-white/10">
                                        {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.title?.toUpperCase()}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Prioridad</Label>
                                <Select value={taskForm.priority} onValueChange={(val) => setTaskForm(p => ({ ...p, priority: val }))}>
                                    <SelectTrigger className="h-11 bg-card border-accent uppercase font-black text-[9px]"><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-card text-primary border-white/10">
                                        <SelectItem value="alta">ALTA</SelectItem>
                                        <SelectItem value="media">MEDIA</SelectItem>
                                        <SelectItem value="baja">BAJA</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fecha de Vencimiento</Label>
                            <Input type="date" value={taskForm.dueDate} onChange={(e) => setTaskForm(p => ({ ...p, dueDate: e.target.value }))} className="h-11 bg-card border-accent font-mono text-xs" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Descripción</Label>
                            <Textarea value={taskForm.description} onChange={(e) => setTaskForm(p => ({ ...p, description: e.target.value }))} placeholder="DETALLES ADICIONALES..." className="bg-card border-accent text-xs uppercase font-medium min-h-[100px]" />
                        </div>
                    </div>
                    <DialogFooter className="p-6 border-t border-accent bg-card">
                        <Button type="button" variant="ghost" onClick={() => setIsTaskModalOpen(false)} className="text-[10px] font-black uppercase tracking-widest">CANCELAR</Button>
                        <Button type="submit" disabled={isSubmittingQuick} className="bg-primary text-background font-black uppercase text-[10px] h-11 px-8 tracking-widest">
                            {isSubmittingQuick ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} CREAR TAREA
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        {/* Modal Crear Evento */}
        <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
            <DialogContent className="max-w-md bg-card border-accent text-primary p-0 overflow-hidden">
                <form onSubmit={handleCreateEvent}>
                    <DialogHeader className="p-6 bg-card border-b border-accent shrink-0 flex flex-row items-center space-y-0 gap-3">
                        <Calendar className="h-6 w-6 text-primary" />
                        <div>
                            <DialogTitle className="text-xl font-bold uppercase tracking-tight">Nuevo Evento</DialogTitle>
                            <DialogDescription className="text-muted-foreground text-[10px] font-black uppercase mt-1">Registra hitos o reuniones</DialogDescription>
                        </div>
                    </DialogHeader>
                    <div className="p-6 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Título del Evento</Label>
                            <Input value={eventForm.title} onChange={(e) => setEventForm(p => ({ ...p, title: e.target.value }))} placeholder="EJ: REUNIÓN DE COORDINACIÓN" required className="h-11 bg-card border-accent uppercase font-bold text-xs" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Proyecto</Label>
                            <Select value={eventForm.projectId} onValueChange={(val) => setEventForm(p => ({ ...p, projectId: val }))}>
                                <SelectTrigger className="h-11 bg-card border-accent uppercase font-black text-[9px]"><SelectValue placeholder="SELECCIONAR" /></SelectTrigger>
                                <SelectContent className="bg-card text-primary border-white/10">
                                    {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.title?.toUpperCase()}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fecha del Evento</Label>
                            <Input type="date" value={eventForm.dueDate} onChange={(e) => setEventForm(p => ({ ...p, dueDate: e.target.value }))} required className="h-11 bg-card border-accent font-mono text-xs" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Descripción</Label>
                            <Textarea value={eventForm.description} onChange={(e) => setEventForm(p => ({ ...p, description: e.target.value }))} placeholder="DETALLES DEL EVENTO..." className="bg-card border-accent text-xs uppercase font-medium min-h-[100px]" />
                        </div>
                    </div>
                    <DialogFooter className="p-6 border-t border-accent bg-card">
                        <Button type="button" variant="ghost" onClick={() => setIsEventModalOpen(false)} className="text-[10px] font-black uppercase tracking-widest">CANCELAR</Button>
                        <Button type="submit" disabled={isSubmittingQuick} className="bg-primary text-background font-black uppercase text-[10px] h-11 px-8 tracking-widest">
                            {isSubmittingQuick ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} REGISTRAR EVENTO
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        </>
    );
}
