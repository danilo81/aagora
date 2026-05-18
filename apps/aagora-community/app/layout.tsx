import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { CommunitySubNav } from '@/components/community-sub-nav';
import DotsOnDa from '@/components/dotsdonda';
import "@workspace/ui/globals.css";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AAGORA - COMUNIDAD',
    description: 'Comunidad en AAGORA',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="es" suppressHydrationWarning>
                <body>
                    <ThemeProvider>
                        <div className="h-full w-full fixed z-0 pointer-events-none">
                            <DotsOnDa />
                        </div>
                        <div className="relative z-10 flex min-h-screen w-full flex-col bg-background/80">
                            <Navbar />
                            <CommunitySubNav />
                            <main className="flex-1">
                                {children}
                            </main>
                        </div>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}