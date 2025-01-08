import Navbar from '@/components/Dashboard/Navbar';
import Footer from '@/components/Footer/Footer';
import React from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
})
{
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}