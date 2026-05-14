import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db, libraryFile } from "@workspace/db";
import { s3Client } from "@/lib/s3-client";

const MAX_FILE_SIZE = 200 * 1024 * 1024;

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const { filename, contentType, size, category = "general", libraryType = "asset" } = await req.json();

        if (!filename || !contentType) {
            return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
        }
        if (size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "El archivo excede el límite de 200MB" }, { status: 400 });
        }

        const uniqueId = crypto.randomUUID();
        const cleanName = filename.replace(/[^a-zA-Z0-9.\-_]/g, "");
        const folder = category.toLowerCase().replace(/\s+/g, "-");
        const r2Key = `construction/${folder}/${userId}/${uniqueId}-${cleanName}`;
        const publicUrl = `${process.env.R2_PUBLIC_URL}/${r2Key}`;

        const command = new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
            Key: r2Key,
            ContentType: contentType,
        });

        const presignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
            signableHeaders: new Set(["content-type"]),
        });

        await db.insert(libraryFile).values({
            userId,
            r2Key,
            name: filename,
            size,
            mimeType: contentType,
            publicUrl,
            libraryType,
            category,
        });

        return NextResponse.json({ presignedUrl, key: r2Key, publicUrl });
    } catch (error: any) {
        console.error("Error in /api/r2/upload:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
