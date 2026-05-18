import { ClerkProvider } from '@clerk/nextjs';
import { esES } from '@clerk/localizations';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import "@workspace/ui/globals.css";
import { Metadata } from 'next';
import DotsOnDa from '@/components/dotsdonda';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
import { Toaster } from '@workspace/ui/components/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AAGORA - CONTABILIDAD Y FINANZAS',
    description: 'Contabilidad y Finanzas en AAGORA',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://pub-0c4e991892914662ba0e3f09fb79757a.r2.dev" />
                <link rel="preconnect" href="https://pub-c09b07f1a7954c46b7f2a640146d8703.r2.dev" />
            </head>
            <body className={`${inter.className} font-body antialiased min-h-screen bg-background text-foreground`}>
                <div className="h-full w-full fixed">
                    <DotsOnDa />
                </div>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ClerkProvider
                        localization={esES}
                    >
                        <TooltipProvider>
                            <main className="flex-1 min-h-screen">
                                <div className="relative w-100vh h-100vh">
                                    <div className="relative">
                                        <Navbar />
                                        {children}
                                    </div>
                                </div>
                            </main>
                            <Toaster />
                        </TooltipProvider>
                    </ClerkProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}