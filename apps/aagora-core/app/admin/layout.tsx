import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db, user } from "@workspace/db";
import { eq } from "drizzle-orm";
import { Navbar } from "@/components/navbar";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    // currentUser() fetches from Clerk backend API — always accurate, no JWT caching
    const clerkUser = await currentUser();
    let role = clerkUser?.publicMetadata?.role as string | undefined;

    // Fallback: if Clerk metadata has no role yet, check local DB by email
    if (!role) {
        const email = clerkUser?.emailAddresses?.[0]?.emailAddress;
        if (email) {
            const dbUser = await db.query.user.findFirst({
                where: eq(user.email, email),
                columns: { role: true },
            });
            role = dbUser?.role ?? undefined;
        }
    }

    if (role !== "admin" && role !== "administrador") {
        redirect("/dashboard");
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
