'use server';

import { db, user, organization } from '@workspace/db';
import { eq } from 'drizzle-orm';

export type CommunityProfile = {
    id: string;
    name: string;
    role: string;
    location: string;
    avatar: string;
    skills: string[];
    connected: boolean;
    type: 'user' | 'organization';
};

export async function getCommunityProfiles(): Promise<CommunityProfile[]> {
    try {
        const [users, organizations] = await Promise.all([
            db.select({
                id: user.id,
                name: user.name,
                cargo: user.cargo,
                location: user.location,
                avatarUrl: user.avatarUrl,
                skills: user.skills,
                showName: user.showName,
                showProfession: user.showProfession,
                showLocation: user.showLocation,
            }).from(user).where(eq(user.isVisible, true)),

            db.select({
                id: organization.id,
                name: organization.name,
                imageUrl: organization.imageUrl,
                location: organization.location,
                skills: organization.skills,
                showName: organization.showName,
                showProfession: organization.showProfession,
                showLocation: organization.showLocation,
            }).from(organization).where(eq(organization.isVisible, true)),
        ]);

        const userProfiles: CommunityProfile[] = users.map((u) => ({
            id: u.id,
            name: u.showName ? (u.name || 'Miembro de AAGORA') : 'Miembro de AAGORA',
            role: u.showProfession ? (u.cargo || 'Profesional') : 'Profesional',
            location: u.showLocation ? (u.location || 'Bolivia') : 'Privado',
            avatar: u.avatarUrl || `https://i.pravatar.cc/150?u=${u.id}`,
            skills: u.skills.length > 0 ? u.skills : ['Profesional'],
            connected: false,
            type: 'user',
        }));

        const orgProfiles: CommunityProfile[] = organizations.map((org) => ({
            id: org.id,
            name: org.showName ? org.name : 'Organización AAGORA',
            role: org.showProfession ? 'Empresa' : 'Empresa',
            location: org.showLocation ? (org.location || 'Bolivia') : 'Privado',
            avatar: org.imageUrl || `https://i.pravatar.cc/150?u=${org.id}`,
            skills: org.skills.length > 0 ? org.skills : ['Constructora'],
            connected: false,
            type: 'organization',
        }));

        return [...userProfiles, ...orgProfiles];
    } catch (error) {
        console.error('Error fetching community profiles:', error);
        return [];
    }
}
