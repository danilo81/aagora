'use server';

import { db, payroll, projectTransaction } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { requireProjectAccess } from '@/lib/require-project-access';

export async function deletePayroll(id: string) {
    if (!id) return { success: false, error: 'Payroll ID is required' };

    try {
        const record = await db.query.payroll.findFirst({ where: eq(payroll.id, id), columns: { projectId: true } });
        if (!record) return { success: false, error: 'Nómina no encontrada.' };

        const userId = await requireProjectAccess(record.projectId);
        if (!userId) return { success: false, error: 'No autorizado' };

        // Delete associated transactions (payrollId FK)
        await db.delete(projectTransaction).where(eq(projectTransaction.payrollId, id));
        // Delete payroll (cascade deletes payrollEntry)
        await db.delete(payroll).where(eq(payroll.id, id));

        return { success: true };
    } catch (error: any) {
        console.error('Error deleting payroll:', error);
        return { success: false, error: error.message };
    }
}
