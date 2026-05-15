'use server';

import { db, bimDocument, bimTopic, projectDocument } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { getR2Client } from "@/lib/r2Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getAuthUserId } from "@/lib/clerk-auth";
import puppeteer, { Browser } from 'puppeteer';
import { lexicalToHtml } from "@/lib/lexical-html";
import { v4 as uuidv4 } from "uuid";
import { BimTopic } from "@/types/types";

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

export async function exportTopicToPDF(
    projectId: string,
    topicId: string,
    folderPath: string = "/"
) {
    let browser: Browser | null = null;
    try {
        const userId = await getAuthUserId();
        if (!userId) throw new Error("No autorizado");

        // Get all topics for this project by finding the bimDocument first
        const [doc] = await db.select({ id: bimDocument.id })
            .from(bimDocument).where(eq(bimDocument.projectId, projectId)).limit(1);

        const allTopics = doc
            ? await db.select().from(bimTopic).where(eq(bimTopic.documentId, doc.id))
                .orderBy(bimTopic.order)
            : [];

        const topicTree = buildTopicTree(allTopics as unknown as BimTopic[], topicId);
        if (!topicTree) throw new Error("Tópico no encontrado");

        const htmlContent = generateProfessionalHtml(topicTree, "Usuario Aagora");

        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
            displayHeaderFooter: true,
            headerTemplate: `
                <div style="font-size: 8px; width: 100%; text-align: center; color: #999; font-family: 'Inter', sans-serif;">
                    DOCUMENTO BIM - ${topicTree.title}
                </div>
            `,
            footerTemplate: `
                <div style="font-size: 8px; width: 100%; text-align: center; color: #999; font-family: 'Inter', sans-serif;">
                    Página <span class="pageNumber"></span> de <span class="totalPages"></span>
                </div>
            `
        });

        const filename = `${topicTree.title.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.pdf`;
        const uniqueKey = `pdf_exports/${uuidv4()}_${filename}`;
        const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME!;

        await getR2Client().send(new PutObjectCommand({
            Bucket: bucketName,
            Key: uniqueKey,
            ContentType: 'application/pdf',
            Body: pdfBuffer
        }));

        const publicUrl = constructR2Url(uniqueKey);

        const [savedDoc] = await db.insert(projectDocument).values({
            projectId,
            userId,
            name: filename,
            type: 'application/pdf',
            size: pdfBuffer.length,
            url: publicUrl,
            folder: folderPath,
            isFolder: false,
            source: "local",
            status: "uploaded",
            authorName: "Usuario Aagora"
        }).returning();

        return { success: true, url: publicUrl, filename, id: savedDoc.id };

    } catch (error: unknown) {
        const errorMessage = "Error desconocido";
        console.error("PDF Export Error:", error);
        return { success: false, error: errorMessage };
    } finally {
        if (browser) await browser.close();
    }
}

function buildTopicTree(allTopics: BimTopic[], startId: string): TopicData | null {
    const topicMap: Record<string, TopicData> = {};

    allTopics.forEach(t => {
        topicMap[t.id] = { ...t, children: [] } as TopicData;
    });
    allTopics.forEach(t => {
        if (t.parentId && topicMap[t.parentId]) {
            topicMap[t.parentId]!.children.push(topicMap[t.id]!);
        }
    });

    return topicMap[startId] || null;
}

function generateProfessionalHtml(rootTopic: TopicData, author: string): string {
    const renderTopicRecursive = (topic: TopicData, level: number): string => {
        const contentHtml = lexicalToHtml(topic.content);
        const subTopicsHtml = topic.children.map(c => renderTopicRecursive(c, level + 1)).join("");

        return `
            <section class="topic-section level-${level}">
                <div class="topic-header">
                    <h${Math.min(level + 1, 6)} class="topic-title">${topic.title}</h${Math.min(level + 1, 6)}>
                    <span class="topic-status status-${topic.status}">${topic.status.toUpperCase()}</span>
                </div>
                <div class="topic-content">
                    ${contentHtml || '<p class="empty-msg"><i>Sin contenido registrado.</i></p>'}
                </div>
                ${subTopicsHtml}
            </section>
        `;
    };

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                
                body {
                    font-family: 'Inter', sans-serif;
                    color: #1a1a1a;
                    line-height: 1.6;
                    font-size: 11px;
                    margin: 0;
                    padding: 0;
                }

                .topic-section {
                    page-break-before: always;
                    margin-bottom: 2cm;
                }

                .level-1 { page-break-before: always; }
                .level-2 { margin-left: 0.5cm; }

                .topic-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid #000;
                    margin-bottom: 1cm;
                    padding-bottom: 0.2cm;
                }

                .topic-title {
                    margin: 0;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: -0.02em;
                    font-size: 24px;
                }

                .topic-status {
                    font-size: 8px;
                    font-weight: 800;
                    padding: 4px 8px;
                    border-radius: 4px;
                    background: #f0f0f0;
                }

                .status-approved { background: #d1fae5; color: #065f46; }
                .status-reviewed { background: #fef3c7; color: #92400e; }

                .topic-content {
                    margin-top: 0.5cm;
                }

                .lexical-p { margin-bottom: 1em; text-align: justify; }
                .lexical-heading { margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 700; text-transform: uppercase; }
                .lexical-quote { 
                    border-left: 4px solid #eaeaea; 
                    padding-left: 1em; 
                    color: #666; 
                    font-style: italic; 
                    margin: 1em 0;
                }
                .lexical-list { padding-left: 1.5em; margin-bottom: 1em; }
                .lexical-listitem { margin-bottom: 0.5em; }

                .empty-msg { color: #999; }

                /* Cover Page Styling */
                .cover-page {
                    height: 90vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    page-break-after: always;
                }

                .cover-title { font-size: 48px; font-weight: 900; text-transform: uppercase; margin-bottom: 0.5cm; }
                .cover-author { font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.2em; }
                .cover-date { font-size: 12px; color: #999; margin-top: 2cm; }
            </style>
        </head>
        <body>
            <div class="cover-page">
                <div class="cover-title">${rootTopic.title}</div>
                <div class="cover-author">GENERADO POR: ${author}</div>
                <div class="cover-date">${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}</div>
            </div>
            ${renderTopicRecursive(rootTopic, 0)}
        </body>
        </html>
    `;
}
