import { NextRequest, NextResponse } from "next/server";
import { getR2Object } from "@/lib/r2-native";

interface Props {
    params: Promise<{ key: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { key } = await params;
        const searchParams = request.nextUrl.searchParams;
        const download = searchParams.get("download") === "true";
        const filename = searchParams.get("filename") || "archivo";

        const keyToFetch = decodeURIComponent(key);

        if (!keyToFetch || keyToFetch === "undefined") {
            return NextResponse.json({ error: "File key is required" }, { status: 400 });
        }

        // Try Public Bucket first for images/public assets, fall back to private
        let response = await getR2Object(keyToFetch, true);
        if (!response) {
            response = await getR2Object(keyToFetch, false);
        }

        if (!response) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        if (!response.body) {
            throw new Error("Empty body from R2");
        }

        // Return the body with correct Content-Type if possible
        const headers = new Headers();
        if (response.contentType) {
            headers.set("Content-Type", response.contentType);
        }
        if (response.contentLength) {
            headers.set("Content-Length", response.contentLength.toString());
        }

        if (download) {
            headers.set("Content-Disposition", `attachment; filename="${encodeURIComponent(filename)}"`);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new Response(response.body as any, {
            status: 200,
            headers: headers,
        });
    } catch (error) {
        console.error("Error viewing file from R2:", error);
        return NextResponse.json({ error: "Failed to fetch file content" }, { status: 500 });
    }
}
