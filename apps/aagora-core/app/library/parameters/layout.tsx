import { Navbar } from '@/components/navbar';

export default function ParametersLibraryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
