import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@workspace/db";
import { libraryFile } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const type = req.nextUrl.searchParams.get("type") ?? "cad";

        const files = await db
            .select()
            .from(libraryFile)
            .where(and(eq(libraryFile.userId, userId), eq(libraryFile.libraryType, type)));

        const result = files.map((f) => ({
            id: f.id,
            key: f.r2Key,
            name: f.name,
            size: f.size,
            mimeType: f.mimeType,
            lastModified: f.createdAt,
            publicUrl: f.publicUrl,
            category: f.category,
            uploadedBy: userId,
            uploadedById: f.userId,
            isOwner: f.userId === userId,
        }));

        return NextResponse.json({ success: true, files: result });
    } catch (error: any) {
        console.error("Error in /api/r2/list:", error);
        return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 });
    }
}
