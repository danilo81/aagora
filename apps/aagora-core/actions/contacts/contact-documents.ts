"use server";

import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db } from "@workspace/db";
import { contactDocument, contact } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { getAuthUserId } from "@/lib/clerk-auth";
import { revalidatePath } from "next/cache";
import { getS3Client } from "@/lib/s3-client";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_MIME_TYPES = new Set([
    "image/jpeg", "image/png", "image/webp", "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip", "application/x-zip-compressed",
    "text/csv", "text/plain", "video/mp4",
]);

// Server-side upload — no CORS needed, file flows Next.js → R2
export async function uploadContactDocument(formData: FormData) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const file = formData.get("file") as File | null;
        const contactId = formData.get("contactId") as string | null;

        if (!file || !contactId) return { success: false, error: "Datos incompletos" };
        if (file.size > MAX_FILE_SIZE)
            return { success: false, error: "El archivo excede el límite de 5 MB" };

        const fileType = file.type || "application/pdf";
        if (!ALLOWED_MIME_TYPES.has(fileType))
            return { success: false, error: "Tipo de archivo no permitido por razones de seguridad." };

        const ownerContact = await db.query.contact.findFirst({
            where: eq(contact.id, contactId),
            columns: { userId: true },
        });
        if (!ownerContact || ownerContact.userId !== userId)
            return { success: false, error: "No tienes permisos para subir documentos a este contacto." };

        const uniqueId = crypto.randomUUID();
        const cleanFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "") || uniqueId;
        const r2Key = `contactos/${contactId}/${uniqueId}-${cleanFileName}`;

        const arrayBuffer = await file.arrayBuffer();

        await getS3Client().send(new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
            Key: r2Key,
            Body: Buffer.from(arrayBuffer),
            ContentType: fileType,
            ContentDisposition: `inline; filename="${file.name}"`,
        }));

        // Bucket is private — store r2Key path as reference; access is via signed GET URLs
        const [saved] = await db
            .insert(contactDocument)
            .values({
                contactId,
                r2Key,
                name: file.name,
                size: file.size,
                mimeType: fileType,
                publicUrl: r2Key, // private bucket: no public URL; use r2Key as identifier
            })
            .returning();

        revalidatePath("/library/contacts");
        return { success: true, document: saved };
    } catch (error: any) {
        console.error("Error uploading contact document:", error);
        return { success: false, error: error?.message ?? "Error al subir el documento" };
    }
}

// Generate a short-lived signed URL for viewing a private document (5 min TTL)
export async function getContactDocumentDownloadUrl(documentId: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const doc = await db.query.contactDocument.findFirst({
            where: eq(contactDocument.id, documentId),
            with: { contact: { columns: { userId: true } } },
        });
        if (!doc) return { success: false, error: "Documento no encontrado" };
        if (doc.contact?.userId !== userId)
            return { success: false, error: "No tienes permisos para acceder a este documento." };

        const command = new GetObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
            Key: doc.r2Key,
            ResponseContentDisposition: `inline; filename="${doc.name}"`,
        });

        const signedUrl = await getSignedUrl(getS3Client(), command, { expiresIn: 300 });
        return { success: true, url: signedUrl };
    } catch (error: any) {
        console.error("Error generating download URL:", error);
        return { success: false, error: "Error al generar URL de descarga" };
    }
}

export async function getContactDocuments(contactId: string) {
    try {
        return await db
            .select()
            .from(contactDocument)
            .where(eq(contactDocument.contactId, contactId))
            .orderBy(contactDocument.createdAt);
    } catch (error) {
        console.error("Error fetching contact documents:", error);
        return [];
    }
}

export async function deleteContactDocument(documentId: string) {
    try {
        const userId = await getAuthUserId();
        if (!userId) return { success: false, error: "No autorizado" };

        const doc = await db.query.contactDocument.findFirst({
            where: eq(contactDocument.id, documentId),
            with: { contact: { columns: { userId: true } } },
        });
        if (!doc) return { success: false, error: "Documento no encontrado" };
        if (doc.contact?.userId !== userId)
            return { success: false, error: "No tienes permisos para eliminar este documento." };

        // Non-fatal R2 deletion — always clean up the DB record
        try {
            await getS3Client().send(new DeleteObjectCommand({
                Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
                Key: doc.r2Key,
            }));
        } catch (r2Error: any) {
            console.error("R2 delete failed (proceeding with DB cleanup):", r2Error?.message);
        }

        await db.delete(contactDocument).where(eq(contactDocument.id, documentId));

        revalidatePath("/library/contacts");
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting contact document:", error);
        return { success: false, error: "Error al eliminar documento" };
    }
}
