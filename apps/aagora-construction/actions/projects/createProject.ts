'use server';

import { db, project, projectConfig, level, siteLog } from '@workspace/db';
import { revalidatePath } from "next/cache";
import { CreateProjectData } from "../../types/types";
import { getAuthUserId } from "@/lib/clerk-auth";

export async function createProject(data: CreateProjectData) {
    try {
        const userId = await getAuthUserId();

        if (!userId) {
            return { success: false, error: 'Sesión no válida o expirada. Por favor, inicie sesión nuevamente.' };
        }

        const [newProject] = await db.insert(project).values({
            title: data.title,
            description: data.description,
            client: data.client,
            location: data.location,
            projectType: data.projectType,
            area: Number(data.area) || 0,
            status: (data.status || 'activo').toLowerCase(),
            imageUrl: data.imageUrl || '/project-img.png',
            authorId: userId,
        }).returning();

        await db.insert(projectConfig).values({
            projectId: newProject.id,
            utility: data.config?.utility ?? 10,
            adminExpenses: data.config?.adminExpenses ?? 5,
            iva: data.config?.iva ?? 13,
            it: data.config?.it ?? 3,
            socialCharges: data.config?.socialCharges ?? 55,
            toolWear: data.config?.toolWear ?? 3,
            exchangeRate: data.config?.exchangeRate ?? 6.96,
            financing: data.config?.financing ?? 0,
            guaranteeRetention: data.config?.guaranteeRetention ?? 7,
            mainCurrency: data.config?.mainCurrency ?? 'BS',
            secondaryCurrency: data.config?.secondaryCurrency ?? 'USD',
            workingDays: data.config?.workingDays ?? 6,
        });

        await db.insert(level).values([
            { name: 'Fundaciones', projectId: newProject.id },
            { name: 'Nivel 1', projectId: newProject.id },
            { name: 'Nivel 2', projectId: newProject.id },
        ]);

        await db.insert(siteLog).values({
            projectId: newProject.id,
            authorId: userId,
            type: 'info',
            content: `PROYECTO INICIADO: El proyecto "${data.title}" ha sido creado con éxito.`,
            date: new Date()
        }).catch(() => null);

        revalidatePath('/projects');
        return { success: true, project: JSON.parse(JSON.stringify(newProject)) };
    } catch (error: any) {
        console.error("Create project error:", error);
        return { success: false, error: "Fallo técnico al crear el proyecto." };
    }
}