import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import "@workspace/ui/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'AAGORA - DISENO',
    description: 'Diseno y modelado en AAGORA',
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider>
            <html lang="es" suppressHydrationWarning>
                <body>
                    <ThemeProvider>
                        <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
                            <Navbar />
                            <main className="flex-1 overflow-y-auto">
                                {children}
                            </main>
                        </div>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
export const runtime = 'edge';