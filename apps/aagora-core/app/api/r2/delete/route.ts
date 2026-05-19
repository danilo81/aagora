import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@workspace/db";
import { libraryFile } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import { deleteR2Object } from "@/lib/r2-native";

export async function DELETE(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const { key } = await req.json();
        if (!key) return NextResponse.json({ error: "Falta el parámetro key" }, { status: 400 });

        const file = await db.query.libraryFile.findFirst({
            where: and(eq(libraryFile.r2Key, key), eq(libraryFile.userId, userId)),
        });

        if (!file) {
            return NextResponse.json({ error: "Archivo no encontrado o sin permisos" }, { status: 404 });
        }

        await deleteR2Object(key, false);

        await db.delete(libraryFile).where(eq(libraryFile.id, file.id));

        return NextResponse.json({ success: true });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error in /api/r2/delete:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
