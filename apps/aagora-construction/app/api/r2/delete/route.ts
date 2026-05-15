import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client } from "@/lib/r2Client";
import { db, libraryFile } from "@workspace/db";
import { eq } from "drizzle-orm";

export async function DELETE(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const body = await request.json();
        const { key } = body;

        if (!key) {
            return NextResponse.json({ error: "File key is required" }, { status: 400 });
        }

        const [file] = await db
            .select()
            .from(libraryFile)
            .where(eq(libraryFile.r2Key, key))
            .limit(1);

        if (!file) {
            return NextResponse.json({ error: "File record not found in database" }, { status: 404 });
        }

        if (file.userId !== userId) {
            return NextResponse.json({ error: "No tienes permiso para eliminar este archivo" }, { status: 403 });
        }

        await getR2Client().send(
            new DeleteObjectCommand({
                Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
                Key: key,
            })
        );

        await db.delete(libraryFile).where(eq(libraryFile.r2Key, key));

        return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
    }
}
export const runtime = 'edge';