"use client";

import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs';
import { User, UserRole } from '../types/types';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const { user: clerkUser, isLoaded } = useUser();
    const { signOut } = useClerkAuth();
    const router = useRouter();

    const loading = !isLoaded;
    const isAuthenticated = !!clerkUser;

    const user: User | null = clerkUser ? {
        id: clerkUser.id,
        name: clerkUser.fullName || '',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        role: (clerkUser.publicMetadata.role as UserRole) || 'viewer',
        telefono: clerkUser.primaryPhoneNumber?.phoneNumber || '',
        cargo: (clerkUser.publicMetadata.cargo as string) || '',
    } : null;

    const logout = async () => {
        await signOut();
        router.push('/');
    };

    const hasRole = (roles: UserRole[]) => {
        return user && roles.includes(user.role);
    };

    return {
        user,
        loading,
        isAuthenticated,
        logout,
        hasRole,
    };
}