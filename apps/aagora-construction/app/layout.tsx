import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import "@workspace/ui/globals.css";
import DotsOnDa from "@workspace/ui/components/dotsdonda";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'AAGORA - CONSTRUCCION',
    description: 'Construcción en AAGORA',
};


export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider localization={esES}>
            <html lang="es" suppressHydrationWarning>
                <body>
                    <ThemeProvider>
                        <div className="h-full w-full fixed">
                            <DotsOnDa />
                        </div>
                        <div className="flex min-h-screen w-full flex-col bg-transparent text-foreground relative">
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
