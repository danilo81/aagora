'use server';

import { db, payroll, payrollEntry, projectTransaction, siteLog } from '@workspace/db';
import { getAuthUserId } from '@/lib/clerk-auth';
import { revalidatePath } from "next/cache";

interface PayrollEntryInput {
    contactId: string;
    daysWorked: number;
    dailyRate: number;
    totalAmount: number;
}

interface CreatePayrollData {
    projectId: string;
    title?: string;
    startDate: Date | string;
    endDate: Date | string;
    totalAmount: number;
    entries: PayrollEntryInput[];
}

export async function createPayroll(data: CreatePayrollData) {
    const { projectId, title, startDate, endDate, totalAmount, entries } = data;

    if (!projectId || !startDate || !endDate || entries.length === 0) {
        return { success: false, error: 'Missing required payroll data' };
    }

    try {
        const userId = await getAuthUserId();
        if (!userId) throw new Error("No autorizado");

        const [newPayroll] = await db.insert(payroll).values({
            projectId,
            title: title || null,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            totalAmount,
            status: 'completado',
        }).returning();

        if (entries.length > 0) {
            await db.insert(payrollEntry).values(
                entries.map(entry => ({
                    payrollId: newPayroll.id,
                    contactId: entry.contactId,
                    daysWorked: entry.daysWorked,
                    dailyRate: entry.dailyRate,
                    totalAmount: entry.totalAmount,
                }))
            );
        }

        await db.insert(projectTransaction).values({
            projectId,
            amount: totalAmount,
            type: 'egreso',
            category: 'pago de planilla',
            description: `Pago de planilla personal: ${new Date(startDate).toLocaleDateString()} al ${new Date(endDate).toLocaleDateString()}`,
            date: new Date(),
            payrollId: newPayroll.id,
        });

        await db.insert(siteLog).values({
            projectId,
            authorId: userId,
            type: 'info',
            content: `PLANILLA DE PERSONAL: Generada planilla por ${totalAmount.toLocaleString('es-ES')} BOB (${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}).`,
            date: new Date()
        }).catch(() => null);

        revalidatePath(`/projects/${projectId}/operations`);
        return { success: true, payroll: newPayroll };
    } catch (error: any) {
        console.error('Error creating payroll:', error);
        return { success: false, error: error.message };
    }
}