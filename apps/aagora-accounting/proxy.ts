import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

const CORE_URL = process.env.NEXT_PUBLIC_CORE_URL ?? "http://localhost:3000";

export default clerkMiddleware(async (auth, request) => {
    if (isPublicRoute(request)) return NextResponse.next();

    const { userId } = await auth();

    if (!userId) {
        return NextResponse.redirect(`${CORE_URL}/login`);
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};
