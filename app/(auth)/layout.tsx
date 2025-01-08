import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { ReduxProvider } from '../../src/redux/provider';

function AuthLoading()
{
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-500"></div>
        </div>
    )
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
})
{
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <ReduxProvider>
                <Suspense fallback={<AuthLoading />}>
                    {children}
                </Suspense>
                <Toaster position="top-center" />
            </ReduxProvider>
        </div>
    );
}