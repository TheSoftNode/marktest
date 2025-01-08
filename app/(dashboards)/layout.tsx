import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { ReduxProvider } from '../../src/redux/provider';
import { AuthGuard } from '@/components/AuthGuard';
import { DashboardLoadingState } from '@/components/UserDashboard/LoadingState';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
})
{
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <ReduxProvider>
                <AuthGuard>
                    <Suspense fallback={<DashboardLoadingState />}>
                        {children}
                    </Suspense>
                </AuthGuard>
                <Toaster position="top-center" />
            </ReduxProvider>
        </div>
    );
}