"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from '@clerk/nextjs/server';
import { db, user } from "@workspace/db";
import { projectDocument } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { getS3Client } from "@/lib/s3-client";


export async function getUploadUrl(fileName: string, fileType: string, fileSize: number, isPublic = false) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) throw new Error("No autorizado");

        const MAX_FILE_SIZE = 200 * 1024 * 1024;
        if (fileSize > MAX_FILE_SIZE) throw new Error("El archivo excede el límite de 200MB");

        const uniqueId = crypto.randomUUID();
        const cleanFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "");
        const fileKey = `proyectos/${uniqueId}-${cleanFileName}`;

        const bucket = isPublic
            ? process.env.CLOUDFLARE_R2_BUCKET_NAME_PUBLIC!
            : process.env.CLOUDFLARE_R2_BUCKET_NAME!;

        const baseUrl = isPublic
            ? process.env.R2_PUBLIC_URL_PUBLIC!
            : process.env.R2_PUBLIC_URL!;

        const command = new PutObjectCommand({
            Bucket: bucket,
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
            publicUrl: `${baseUrl}/${fileKey}`
        };

    } catch (error) {
        return { success: false, error: String(error) };
    }
}

export async function saveFileRecordToDB(data: { name: string, key: string, url: string, size: number, mimeType: string, projectId: string }) {
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("No autorizado");

    try {
        const [foundUser] = await db.select({ id: user.id, name: user.name })
            .from(user)
            .where(eq(user.id, clerkId))
            .limit(1);

        if (!foundUser) throw new Error("Usuario no encontrado");

        const [newDoc] = await db.insert(projectDocument).values({
            name: data.name,
            url: data.url,
            size: data.size,
            type: data.mimeType,
            projectId: data.projectId,
            userId: foundUser.id,
            authorName: foundUser.name || "Usuario Aagora",
            status: "uploaded",
            source: "r2"
        }).returning();

        return { success: true, document: newDoc };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Error al guardar en base de datos" };
    }
}