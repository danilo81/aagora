import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db, libraryFile } from "@workspace/db";
import { eq, and } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const libraryType = searchParams.get("type") ?? "cad";

        const files = await db
            .select()
            .from(libraryFile)
            .where(and(eq(libraryFile.libraryType, libraryType), eq(libraryFile.userId, userId)))
            .orderBy(libraryFile.createdAt);

        return NextResponse.json({
            success: true,
            files: files.map((f) => ({
                id: f.id,
                key: f.r2Key,
                name: f.name,
                size: f.size,
                mimeType: f.mimeType,
                publicUrl: f.publicUrl,
                category: f.category,
                lastModified: f.createdAt,
                uploadedById: f.userId,
                isOwner: true,
            })),
        });
    } catch (error) {
        console.error("Error listing files from DB:", error);
        return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
    }
}
