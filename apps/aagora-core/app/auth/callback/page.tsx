import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db, user } from "@workspace/db";
import { eq } from "drizzle-orm";

export default async function AuthCallbackPage() {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const accountType = (sessionClaims?.publicMetadata as Record<string, unknown>)
        ?.accountType as string | undefined;

    const client = await clerkClient();

    // Ensure a local DB record exists for this Clerk user
    try {
        const clerkUser = await currentUser();
        if (clerkUser) {
            const email = clerkUser.emailAddresses.find(
                e => e.id === clerkUser.primaryEmailAddressId
            )?.emailAddress;

            if (email) {
                const existing = await db.query.user.findFirst({
                    where: eq(user.email, email),
                    columns: { id: true },
                });

                if (!existing) {
                    const name = [clerkUser.firstName, clerkUser.lastName]
                        .filter(Boolean).join(' ') || email;
                    const role = (clerkUser.publicMetadata?.role as string | undefined) ?? 'usuario';
                    await db.insert(user).values({ name, email, role }).onConflictDoNothing();
                }
            }
        }
    } catch (e) {
        console.error("AuthCallback: failed to sync local DB user:", e);
    }

    // Already has account type — route by type
    if (accountType) {
        if (accountType === "proveedor") {
            redirect(process.env.NEXT_PUBLIC_COMMUNITY_URL ?? "http://localhost:3002");
        }
        redirect("/dashboard");
    }

    // No account type set yet — assign default "profesional" and go to dashboard
    try {
        await client.users.updateUserMetadata(userId, {
            publicMetadata: { accountType: "profesional" },
        });
    } catch (e) {
        console.error("Error setting default accountType:", e);
    }

    redirect("/dashboard");
}
