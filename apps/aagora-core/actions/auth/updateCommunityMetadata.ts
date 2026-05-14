'use server';

import { db, user, organization } from '@workspace/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getDbUser } from '@/lib/get-db-user';

export interface CommunityProfileMetadata {
    isVisible: boolean;
    showName: boolean;
    showProfession: boolean;
    showLocation: boolean;
}

export async function updateCommunityMetadata(
    type: 'user' | 'organization',
    data: CommunityProfileMetadata,
    orgId?: string
) {
    const dbUser = await getDbUser();
    if (!dbUser) {
        throw new Error('No autorizado');
    }

    try {
        if (type === 'user') {
            await db.update(user)
                .set({
                    isVisible: data.isVisible,
                    showName: data.showName,
                    showProfession: data.showProfession,
                    showLocation: data.showLocation,
                })
                .where(eq(user.id, dbUser.id));
        } else if (type === 'organization' && orgId) {
            await db.update(organization)
                .set({
                    isVisible: data.isVisible,
                    showName: data.showName,
                    showProfession: data.showProfession,
                    showLocation: data.showLocation,
                })
                .where(eq(organization.id, orgId));
        }

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Error al actualizar metadatos de comunidad:', error);
        return { success: false, error: 'No se pudieron guardar los cambios' };
    }
}
