"use client";

import {
  LogIn,
  Sun,
  Moon,
  ChevronRight,
  Check,
  Blocks,
  PieChart,
  Package,
  Users,
  Hammer,
  Zap,
  Globe,
  LayoutDashboard,
  ArrowRight,
  Monitor
} from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Logo from '@workspace/ui/components/logo';

const PILLARS = [
  {
    letter: "A",
    title: "Arquitectura",
    desc: "Integración de modelos BIM y diseño técnico especializado.",
    icon: Monitor
  },
  {
    letter: "A",
    title: "Análisis",
    desc: "Datos operativos transformados en decisiones estratégicas.",
    icon: PieChart
  },
  {
    letter: "G",
    title: "Gestión",
    desc: "Administración integral de recursos y tiempos de obra.",
    icon: Blocks
  },
  {
    letter: "O",
    title: "Organización",
    desc: "Estructura optimizada para flujos de trabajo eficientes.",
    icon: LayoutDashboard
  },
  {
    letter: "R",
    title: "Red",
    desc: "Conectividad total entre proveedores, clientes y equipos.",
    icon: Globe
  },
  {
    letter: "A",
    title: "Automatización",
    desc: "Procesos inteligentes que eliminan tareas repetitivas.",
    icon: Zap
  }
];

const MODULES = [
  {
    title: "Control de Proyectos",
    desc: "Seguimiento en tiempo real de estados, hitos y avances de construcción.",
    icon: Hammer
  },
  {
    title: "Gestión Financiera",
    desc: "Balances detallados, control de egresos e ingresos automatizado.",
    icon: PieChart
  },
  {
    title: "Logística y Almacén",
    desc: "Sincronización de suministros y trazabilidad de materiales.",
    icon: Package
  },
  {
    title: "Comunidad y Contactos",
    desc: "Directorio centralizado de proveedores y colaboradores estratégicos.",
    icon: Users
  }
];

const PRICING = [
  {
    name: "Profesional",
    price: "$30",
    desc: "Para profesionales que inician su digitalización.",
    features: ["2 Proyecto activo", "Módulo Comunidad", "Módulo Design", "Módulo construction", "2 Usuarios asistentes", "Control de organización", "Soporte vía comunidad"],
    button: "Comenzar",
    featured: false
  },
  {
    name: "Empresarial",
    price: "$150",
    desc: "Control total para empresas en crecimiento.",
    features: ["Proyectos ilimitados", "Módulo Comunidad", "Módulo Design", "Módulo Construction", "Módulo financiero", "Gestión de almacenes", "Soporte prioritario"],
    button: "Probar Pro",
    featured: true
  },
  {
    name: "Corporativo",
    price: "Custom",
    desc: "Soluciones a medida para grandes corporaciones.",
    features: ["Proyectos ilimitados", "Usuarios ilimitados", "Todos los Módulos", "API de integración", "Cuenta con Manager dedicado", "SSO y Seguridad avanzada", "Soporte prioritario"],
    button: "Contactar Ventas",
    featured: false
  }
];

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const init = () => setMounted(true);
    init();
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-transparent text-foreground selection:bg-transparent selection:text-primary-foreground">
      {/* City roads SVG background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Santa Cruz de la Sierra.svg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover city-drift dark:invert "
          style={{ opacity: 0.09 }}
        />
      </div>

      {/* Navbar Adicional */}
      <nav className="fixed top-0 w-full z-50 border-b ring-1 ring-accent/20 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo height={32} widths={32} />
            <span className="font-black tracking-tighter text-lg uppercase">AAGORA</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="#modulos" className="hover:text-primary transition-colors">Módulos</a>
            <a href="#precios" className="hover:text-primary transition-colors">Precios</a>
            <a href="#contacto" className="hover:text-primary transition-colors">Contacto</a>
            <a href="https://aagora.community.app" className="hover:text-primary transition-colors">Comunidad</a>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl h-9 w-9"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Link href="/sign-in">
              <Button size="sm" className="font-black uppercase tracking-widest text-[10px] rounded-lg px-6 h-9 cursor-pointer hover:scale-105 active:scale-95">
                Iniciar Sesión <LogIn className="ml-2 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="p-4">
            <Logo size={200} className="md:w-[250px] md:h-[250px]" />
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter font-headline text-primary">
              AA<span className="text-neutral-500">GOR</span><span className="text-primary">A</span>
            </h1>
            <p className="text-primary uppercase tracking-[0.5em] text-[10px] md:text-[14px] font-black max-w-2xl leading-relaxed">
              Arquitectura • Análisis • Gestión • Organización • Red • Automatización
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/login">
              <Button size="lg" className="h-14 px-10 font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto cursor-pointer">
                Empezar Ahora <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

          </div>
        </div>

        <div className="absolute bottom-10 animate-bounce opacity-20">
          <ChevronRight className="rotate-90 h-6 w-6" />
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto ">
        <div className="text-center mb-20 space-y-2">
          <Badge variant="outline" className=" bg-card text-[10px] font-black uppercase tracking-[0.3em] py-1 px-4 mb-4 border-primary/20 text-primary rounded-full">Nuestra Visión</Badge>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Los Pilares de AAGORA</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {PILLARS.map((pillar, i) => (
            <Card key={i} className="bg-card border-accent/20 hover:border-accent transition-all group overflow-hidden relative">
              <div className="absolute -right-4 -top-4 text-8xl font-black text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none">
                {pillar.letter}
              </div>
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  <pillar.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-black uppercase tracking-widest">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-medium">{pillar.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Modules Spotlight Section */}
      <section id="modulos" className="py-24 bg-accent/20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">Módulos Especializados</h2>
              <p className="text-muted-foreground font-medium max-w-lg">Todo lo que necesitas para gestionar obras y proyectos complejos desde una sola interfaz centralizada.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODULES.map((module, i) => (
              <div key={i} className="p-6 bg-card border border-accent/20 rounded-3xl hover:shadow-2xl hover:shadow-primary/5 transition-all group">
                <div className="p-3 bg-secondary rounded-2xl w-fit mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <module.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest mb-3">{module.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-2">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Suscripciones</h2>
          <p className="text-muted-foreground font-medium">Planes flexibles que se adaptan al tamaño de tu operación.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING.map((plan, i) => (
            <Card key={i} className={`relative flex flex-col  rounded-3xl border-accent/20 ring-accent/20 overflow-hidden ${plan.featured ? 'border-accent ring-1 ring-accent ' : ''}`}>
              {plan.featured && (
                <div className="absolute top-0 right-0 p-3 bg-primary text-primary-foreground text-[8px] font-black uppercase tracking-widest rounded-bl-xl">
                  Recomendado
                </div>
              )}
              <CardHeader className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{plan.name}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tighter text-primary">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground text-xs uppercase font-black">/mes</span>}
                </div>
                <p className="text-xs text-muted-foreground font-bold">{plan.desc}</p>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3 ">
                      <div className="p-0.5 bg-emerald-500/10 rounded-full">
                        <Check className="h-3 w-3 text-emerald-500" />
                      </div>
                      <span className="text-xs font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href="/login" className="block w-full">
                  <Button
                    className={`w-full h-12 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 cursor-pointer ${!plan.featured ? 'variant-outline border-accent/50' : ''}`}
                    variant={plan.featured ? 'default' : 'outline'}
                  >
                    {plan.button}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="py-20 border-t border-accent/20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <Logo size={40} />
                <span className="font-black tracking-tighter text-2xl uppercase">AAGORA</span>
              </div>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-sm">
                La plataforma definitiva para la gestión de arquitectura y construcción. Potencia tu productividad con herramientas basadas en datos.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Compañía</h4>
              <ul className="space-y-3 text-xs font-bold text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">admin@aagoraapp.com</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-accent/50 flex flex-col md:flex-row justify-between gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
              © 2026 AAGORA. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
