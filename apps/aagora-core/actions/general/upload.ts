"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getAuthUserId } from '@/lib/clerk-auth';
import { db } from "@workspace/db";
import { projectDocument } from "@workspace/db/schema";
import { getS3Client } from "@/lib/s3-client";
import { getDbUser } from "@/lib/get-db-user";

export async function getUploadUrl(fileName: string, fileType: string, fileSize: number) {
    try {
        const clerkId = await getAuthUserId();
        if (!clerkId) throw new Error("No autorizado");

        const dbUser = await getDbUser();
        if (!dbUser) throw new Error("Usuario no encontrado");

        const MAX_FILE_SIZE = 200 * 1024 * 1024;
        if (fileSize > MAX_FILE_SIZE) throw new Error("El archivo excede el límite de 200MB");

        const ALLOWED_MIME_TYPES = [
            "image/jpeg", "image/png", "image/webp", "image/gif",
            "application/pdf", 
            "application/msword", 
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/zip", "application/x-zip-compressed", 
            "text/csv", "text/plain", "video/mp4"
        ];
        if (!ALLOWED_MIME_TYPES.includes(fileType)) {
            throw new Error("Tipo de archivo no permitido por razones de seguridad.");
        }

        const uniqueId = crypto.randomUUID();
        const cleanFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "");
        const fileKey = `proyectos/${uniqueId}-${cleanFileName}`;

        const command = new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
            Key: fileKey,
            ContentType: fileType,
        });

        const signedUrl = await getSignedUrl(getS3Client(), command, {
            expiresIn: 3600,
            signableHeaders: new Set(["content-type"]),
        });

        return {
            success: true,
            uploadUrl: signedUrl,
            fileKey: fileKey,
            publicUrl: `${process.env.R2_PUBLIC_URL}/${fileKey}`
        };

    } catch (error) {
        return { success: false, error: String(error) };
    }
}

export async function saveFileRecordToDB(data: { name: string, key: string, url: string, size: number, mimeType: string, projectId: string }) {
    const clerkId = await getAuthUserId();
    if (!clerkId) throw new Error("No autorizado");

    try {
        const dbUser = await getDbUser();
        if (!dbUser) throw new Error("Usuario no encontrado");

        const [newDoc] = await db.insert(projectDocument).values({
            name: data.name,
            url: data.url,
            size: data.size,
            type: data.mimeType,
            projectId: data.projectId,
            userId: dbUser.id,
            authorName: dbUser.name || "Usuario Aagora",
            status: "uploaded",
            source: "r2"
        }).returning();

        return { success: true, document: newDoc };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Error al guardar en base de datos" };
    }
}
