import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db } from "@workspace/db";
import { libraryFile } from "@workspace/db/schema";
import { getS3Client } from "@/lib/s3-client";

const MAX_FILE_SIZE = 200 * 1024 * 1024;

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const { filename, contentType, size, libraryType = "cad", isPublic = false } = await req.json();

        if (!filename || !contentType) {
            return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
        }
        if (size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "El archivo excede el límite de 200MB" }, { status: 400 });
        }

        const uniqueId = crypto.randomUUID();
        const cleanName = filename.replace(/[^a-zA-Z0-9.\-_]/g, "");
        const folder = isPublic ? `proyectos/${userId}` : `libreria/${libraryType}/${userId}`;
        const r2Key = `${folder}/${uniqueId}-${cleanName}`;

        const bucket = isPublic
            ? (process.env.CLOUDFLARE_R2_BUCKET_NAME_PUBLIC || process.env.CLOUDFLARE_R2_BUCKET_NAME!)
            : process.env.CLOUDFLARE_R2_BUCKET_NAME!;
        const baseUrl = isPublic
            ? (process.env.R2_PUBLIC_URL_PUBLIC || process.env.R2_PUBLIC_URL!)
            : process.env.R2_PUBLIC_URL!;

        const publicUrl = `${baseUrl}/${r2Key}`;

        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: r2Key,
            ContentType: contentType,
        });

        const presignedUrl = await getSignedUrl(getS3Client(), command, {
            expiresIn: 3600,
            signableHeaders: new Set(["content-type"]),
        });

        // Track in DB — non-blocking, upload succeeds regardless
        db.insert(libraryFile).values({
            userId,
            r2Key,
            name: filename,
            size,
            mimeType: contentType,
            publicUrl,
            libraryType,
            category: libraryType === "cad" ? "CAD Design" : "3D Model",
        }).catch((err) => console.error("[r2/upload] DB insert failed:", err));

        return NextResponse.json({ presignedUrl, key: r2Key, publicUrl });
    } catch (error: any) {
        console.error("Error in /api/r2/upload:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
export const runtime = 'edge';