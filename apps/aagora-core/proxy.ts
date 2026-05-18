import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ratelimit } from "@/lib/rate-limit";
import { getAppUrl } from "@workspace/ui/lib/utils";

const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/login(.*)",
    "/register(.*)",
    "/forgot-password(.*)",
]);

const isHomeRoute = createRouteMatcher(["/"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);
const isCallbackRoute = createRouteMatcher(["/auth/callback(.*)"]);

export default clerkMiddleware(async (auth, request) => {
    // Implement Rate Limiting if Upstash is configured
    if (ratelimit) {
        const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "127.0.0.1";
        const { success, limit, reset, remaining } = await ratelimit.limit(ip);
        
        if (!success) {
            return new NextResponse("Too Many Requests - Rate limit exceeded", {
                status: 429,
                headers: {
                    "X-RateLimit-Limit": limit.toString(),
                    "X-RateLimit-Remaining": remaining.toString(),
                    "X-RateLimit-Reset": reset.toString(),
                },
            });
        }
    }

    const { userId, sessionClaims } = await auth();
    const metadata = sessionClaims?.publicMetadata as Record<string, unknown> | undefined;
    const accountType = metadata?.accountType as string | undefined;
    
    // Get host header to dynamically resolve the redirect URL if running on Vercel/Cloudflare
    const host = request.headers.get("host") || undefined;

    // Landing page: authenticated users go to dashboard, others see landing
    if (isHomeRoute(request)) {
        if (userId) {
            if (accountType === "proveedor") {
                return NextResponse.redirect(getAppUrl("community", host));
            }
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next();
    }

    // Auth pages always public
    if (isPublicRoute(request)) {
        return NextResponse.next();
    }

    // Callback and onboarding only need a valid session
    if (isCallbackRoute(request) || isOnboardingRoute(request)) {
        if (!userId) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
    }

    // All other protected routes require authentication
    if (!userId) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Admin routes: role check is deferred to the layout (uses currentUser() for
    // fresh Clerk metadata — avoids JWT caching issues). Middleware only verifies
    // that the session is authenticated (userId check above covers that).

    if (accountType === "proveedor") {
        return NextResponse.redirect(getAppUrl("community", host));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
