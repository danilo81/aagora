'use server';

import { db, payroll, payrollEntry, projectTransaction } from '@workspace/db';
import { eq } from 'drizzle-orm';

interface PayrollEntryInput {
    contactId: string;
    daysWorked: number;
    dailyRate: number;
    totalAmount: number;
}

interface UpdatePayrollData {
    id: string;
    title?: string;
    startDate: Date | string;
    endDate: Date | string;
    totalAmount: number;
    entries: PayrollEntryInput[];
}

export async function updatePayroll(data: UpdatePayrollData) {
    const { id, title, startDate, endDate, totalAmount, entries } = data;

    if (!id || !startDate || !endDate || entries.length === 0) {
        return { success: false, error: 'Missing required payroll data' };
    }

    try {
        await db.delete(payrollEntry).where(eq(payrollEntry.payrollId, id));

        const [updatedPayroll] = await db.update(payroll)
            .set({
                title: title || null,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                totalAmount,
            })
            .where(eq(payroll.id, id))
            .returning();

        if (entries.length > 0) {
            await db.insert(payrollEntry).values(
                entries.map(entry => ({
                    payrollId: id,
                    contactId: entry.contactId,
                    daysWorked: entry.daysWorked,
                    dailyRate: entry.dailyRate,
                    totalAmount: entry.totalAmount,
                }))
            );
        }

        // Update or create linked transaction
        const [existingTx] = await db.select({ id: projectTransaction.id })
            .from(projectTransaction)
            .where(eq(projectTransaction.payrollId, id))
            .limit(1);

        const description = `Pago de planilla personal: ${new Date(startDate).toLocaleDateString()} al ${new Date(endDate).toLocaleDateString()}`;

        if (existingTx) {
            await db.update(projectTransaction)
                .set({ amount: totalAmount, description })
                .where(eq(projectTransaction.id, existingTx.id));
        } else {
            await db.insert(projectTransaction).values({
                projectId: updatedPayroll.projectId,
                amount: totalAmount,
                type: 'egreso',
                category: 'pago de planilla',
                description,
                payrollId: id,
                date: new Date(),
            });
        }

        return { success: true, payroll: updatedPayroll };
    } catch (error: any) {
        console.error('Error updating payroll:', error);
        return { success: false, error: error.message };
    }
}