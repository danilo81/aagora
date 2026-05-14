import { useState } from 'react';
import { toast } from 'sonner';
import { getUploadUrl, saveFileRecordToDB } from '@/actions/general/upload';

interface UseUploadOptions {
    projectId: string;
    onSuccess?: (document: any) => void;
    onError?: (error: Error) => void;
}

export function useCloudflareUpload({ projectId, onSuccess, onError }: UseUploadOptions) {
    const [isUploading, setIsUploading] = useState(false);

    const uploadFile = async (file: File) => {
        setIsUploading(true);

        try {
            const urlRes = await getUploadUrl(file.name, file.type, file.size);

            if (!urlRes.success || !urlRes.uploadUrl) {
                throw new Error(urlRes.error || "Error al generar URL de subida");
            }

            const uploadRes = await fetch(urlRes.uploadUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                },
            });

            if (!uploadRes.ok) {
                throw new Error("Fallo la subida al servidor de almacenamiento (R2)");
            }

            const dbRes = await saveFileRecordToDB({
                name: file.name,
                key: urlRes.fileKey!,
                url: urlRes.publicUrl!,
                size: file.size,
                mimeType: file.type,
                projectId: projectId,
            });

            if (!dbRes.success || !dbRes.document) {
                throw new Error(dbRes.error || "Error al guardar el registro en la base de datos");
            }

            if (onSuccess) onSuccess(dbRes.document);

            return dbRes.document;

        } catch (error: any) {
            console.error("Error en useCloudflareUpload:", error);
            if (onError) {
                onError(error);
            } else {
                toast.error("Ocurrió un error inesperado al subir el archivo");
            }
            throw error;
        } finally {
            setIsUploading(false);
        }
    };

    return {
        uploadFile,
        isUploading
    };
}