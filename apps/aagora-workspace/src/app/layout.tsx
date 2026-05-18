import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { esES } from '@clerk/localizations';
import { shadcn } from '@clerk/themes';
import { Toaster } from '@workspace/ui/components/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
import DotsOnDa from '@/components/dotsdonda';
import { Navbar } from "@/components/navbar";
import { ProjectPermissionsProvider } from "@/contexts/project-permissions-context";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "AAGORA - WORKSPACE",
	description: "Workspace en AAGORA",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body className={`${inter.className} font-body antialiased min-h-screen bg-background text-foreground`}>
				<div className="h-full w-full fixed z-0 pointer-events-none">
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
						<ProjectPermissionsProvider isAuthor={true} permissions={{}}>
							<TooltipProvider>
								<div className="relative z-10 flex flex-col min-h-screen">
									<Navbar />
									<main className="flex-1">
										{children}
									</main>
								</div>
								<Toaster />
							</TooltipProvider>
						</ProjectPermissionsProvider>
					</ClerkProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
