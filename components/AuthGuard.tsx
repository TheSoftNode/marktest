"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMeQuery } from '@/src/redux/features/auth/authApi';
import { DashboardLoadingState } from './UserDashboard/LoadingState';

type UserRole = 'student' | 'lecturer' | 'institution' | 'admin';

interface AuthGuardProps
{
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps)
{
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const { data: userData, isLoading, error } = useGetMeQuery();

    // console.log('AuthGuard', { token, userData, isLoading, error });

    useEffect(() =>
    {
        if (!token)
        {
            router.push('/login');
            return;
        }

        if (!isLoading && !userData)
        {
            router.push('/login');
            return;
        }

        if (userData && allowedRoles && !allowedRoles.includes(userData.user.user_type as UserRole))
        {
            router.push('/unauthorized');
            return;
        }
    }, [token, userData, isLoading, router, allowedRoles]);

    if (isLoading)
    {
        return <DashboardLoadingState />;
    }

    if (!token || !userData || (allowedRoles && !allowedRoles.includes(userData.user.user_type as UserRole)))
    {
        return null;
    }

    return <>{children}</>;
}