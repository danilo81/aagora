import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { esES } from '@clerk/localizations';
import { shadcn } from '@clerk/ui/themes';
import { Toaster } from '@workspace/ui/components/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
import DotsOnDa from '@workspace/ui/components/dotsdonda';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AAGORA',
  description: 'Gestión Integral.',
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
            appearance={{
              theme: shadcn,
            }}
          >
            <TooltipProvider>
              <main className="flex-1 min-h-screen">
                <div className="relative w-100vh h-100vh">
                  <div className="relative">
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