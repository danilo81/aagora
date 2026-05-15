'use server';

import { db, bimDocument, bimTopic, projectDocument } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getR2Client } from "@/lib/r2Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getAuthUserId } from "@/lib/clerk-auth";
import { lexicalToHtml } from "@/lib/lexical-html";
import { v4 as uuidv4 } from "uuid";
import { BimTopic } from "@/types/types";
import { PDFDocument, StandardFonts, rgb, PageSizes } from 'pdf-lib';

function constructR2Url(key: string): string {
    const publicBaseUrl = process.env.R2_PUBLIC_URL || process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
    if (publicBaseUrl) {
        return `${publicBaseUrl.endsWith("/") ? publicBaseUrl : publicBaseUrl + "/"}${encodeURIComponent(key)}`;
    }
    const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT || "";
    const match = endpoint.match(/https:\/\/([a-z0-9]+)\.r2\.cloudflarestorage\.com/);
    const accountId = match ? match[1] : "";
    return `https://pub-${accountId}.r2.dev/${encodeURIComponent(key)}`;
}

interface TopicData {
    id: string;
    title: string;
    content: string | null;
    status: string;
    children: TopicData[];
}

function htmlToText(html: string | null | undefined): string {
    if (!html) return '';
    return html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '\n')
        .replace(/<\/div>/gi, '\n')
        .replace(/<\/h[1-6]>/gi, '\n\n')
        .replace(/<li>/gi, '• ')
        .replace(/<\/li>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function wrapText(text: string, font: Awaited<ReturnType<PDFDocument['embedFont']>>, size: number, maxWidth: number): string[] {
    const paragraphs = text.split('\n');
    const lines: string[] = [];

    for (const paragraph of paragraphs) {
        if (!paragraph.trim()) { lines.push(''); continue; }
        const words = paragraph.split(' ');
        let currentLine = '';
        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            if (font.widthOfTextAtSize(testLine, size) > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) lines.push(currentLine);
    }
    return lines;
}

async function generatePDF(rootTopic: TopicData, author: string): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const [pageWidth, pageHeight] = PageSizes.A4;
    const margin = 56;
    const contentWidth = pageWidth - 2 * margin;
    const lineHeight = 14;
    const colorBlack = rgb(0.06, 0.06, 0.06);
    const colorGray = rgb(0.45, 0.45, 0.45);
    const colorLight = rgb(0.65, 0.65, 0.65);

    // — Cover page —
    const cover = pdfDoc.addPage(PageSizes.A4);
    const titleSize = 28;
    const titleLines = wrapText(rootTopic.title.toUpperCase(), fontBold, titleSize, contentWidth);
    let coverY = pageHeight / 2 + (titleLines.length * titleSize * 1.3) / 2 + 40;

    for (const line of titleLines) {
        const w = fontBold.widthOfTextAtSize(line, titleSize);
        cover.drawText(line, { x: (pageWidth - w) / 2, y: coverY, size: titleSize, font: fontBold, color: colorBlack });
        coverY -= titleSize * 1.4;
    }

    // Divider
    cover.drawLine({ start: { x: margin, y: coverY - 10 }, end: { x: pageWidth - margin, y: coverY - 10 }, thickness: 1.5, color: colorBlack });
    coverY -= 30;

    const authorText = `GENERADO POR: ${author.toUpperCase()}`;
    const aw = fontRegular.widthOfTextAtSize(authorText, 9);
    cover.drawText(authorText, { x: (pageWidth - aw) / 2, y: coverY, size: 9, font: fontRegular, color: colorGray });

    const dateText = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase();
    const dw = fontRegular.widthOfTextAtSize(dateText, 8);
    cover.drawText(dateText, { x: (pageWidth - dw) / 2, y: coverY - 18, size: 8, font: fontRegular, color: colorLight });

    // — Topic pages —
    const renderTopic = (topic: TopicData, level: number) => {
        let page = pdfDoc.addPage(PageSizes.A4);
        let y = pageHeight - margin;

        const headingSize = Math.max(10, 18 - level * 3);
        const indent = margin + level * 12;

        // Heading
        const headingLines = wrapText(topic.title.toUpperCase(), fontBold, headingSize, contentWidth - level * 12);
        for (const line of headingLines) {
            if (y < margin + 30) { page = pdfDoc.addPage(PageSizes.A4); y = pageHeight - margin; }
            page.drawText(line, { x: indent, y, size: headingSize, font: fontBold, color: colorBlack });
            y -= headingSize * 1.4;
        }

        // Underline
        page.drawLine({ start: { x: margin, y: y + 6 }, end: { x: pageWidth - margin, y: y + 6 }, thickness: level === 0 ? 1.5 : 0.5, color: colorBlack });
        y -= 12;

        // Status badge (text)
        const statusText = `ESTADO: ${topic.status.toUpperCase()}`;
        page.drawText(statusText, { x: indent, y, size: 7, font: fontBold, color: colorGray });
        y -= lineHeight + 4;

        // Content
        const contentText = htmlToText(lexicalToHtml(topic.content));
        if (contentText) {
            const contentLines = wrapText(contentText, fontRegular, 10, contentWidth);
            for (const line of contentLines) {
                if (y < margin + 20) { page = pdfDoc.addPage(PageSizes.A4); y = pageHeight - margin; }
                page.drawText(line, { x: indent, y, size: 10, font: fontRegular, color: colorBlack });
                y -= lineHeight;
            }
        } else {
            page.drawText('Sin contenido registrado.', { x: indent, y, size: 10, font: fontRegular, color: colorLight });
        }

        for (const child of topic.children) {
            renderTopic(child, level + 1);
        }
    };

    renderTopic(rootTopic, 0);

    return pdfDoc.save();
}

export async function exportTopicToPDF(
    projectId: string,
    topicId: string,
    folderPath: string = "/"
) {
    try {
        const userId = await getAuthUserId();
        if (!userId) throw new Error("No autorizado");

        const [doc] = await db.select({ id: bimDocument.id })
            .from(bimDocument).where(eq(bimDocument.projectId, projectId)).limit(1);

        const allTopics = doc
            ? await db.select().from(bimTopic).where(eq(bimTopic.documentId, doc.id)).orderBy(bimTopic.order)
            : [];

        const topicTree = buildTopicTree(allTopics as unknown as BimTopic[], topicId);
        if (!topicTree) throw new Error("Tópico no encontrado");

        const pdfBytes = await generatePDF(topicTree, "Usuario Aagora");

        const filename = `${topicTree.title.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.pdf`;
        const uniqueKey = `pdf_exports/${uuidv4()}_${filename}`;

        await getR2Client().send(new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
            Key: uniqueKey,
            ContentType: 'application/pdf',
            Body: pdfBytes,
        }));

        const publicUrl = constructR2Url(uniqueKey);

        const [savedDoc] = await db.insert(projectDocument).values({
            projectId,
            userId,
            name: filename,
            type: 'application/pdf',
            size: pdfBytes.length,
            url: publicUrl,
            folder: folderPath,
            isFolder: false,
            source: "local",
            status: "uploaded",
            authorName: "Usuario Aagora"
        }).returning();

        return { success: true, url: publicUrl, filename, id: savedDoc.id };

    } catch (error: unknown) {
        console.error("PDF Export Error:", error);
        return { success: false, error: "Error al generar PDF" };
    }
}

function buildTopicTree(allTopics: BimTopic[], startId: string): TopicData | null {
    const topicMap = new Map<string, TopicData>();
    allTopics.forEach(t => topicMap.set(t.id, { ...t, children: [] } as TopicData));
    allTopics.forEach(t => {
        if (t.parentId) {
            const parent = topicMap.get(t.parentId);
            const child = topicMap.get(t.id);
            if (parent && child) parent.children.push(child);
        }
    });
    return topicMap.get(startId) ?? null;
}
