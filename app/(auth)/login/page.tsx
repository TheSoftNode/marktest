"use client"

import React from 'react';
import { useState } from 'react';
import { ArrowLeft, Mail, Lock, Loader2, EyeOff, Eye } from 'lucide-react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useLoginMutation } from '@/src/redux/features/auth/authApi';

export default function LoginPage()
{
    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const togglePassword = () => setShowPassword((prev) => !prev);

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim())
        {
            toast.error('Please fill in all fields');
            return;
        }

        try
        {
            const response = await toast.promise(
                login(formData).unwrap(),
                {
                    loading: 'Signing in...',
                    success: 'Signed in successfully!',
                    error: (err) => err?.data?.error || 'Failed to sign in'
                }
            );

            // If user is not verified, redirect to verification page
            if (response.warning === "Account not verified")
            {
                toast.error('Please verify your email first');
                router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
                return;
            }

            // Successful login - redirect to dashboard
            router.push('/Dashboard');

        } catch (error)
        {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-4"> */}
            <main className="flex-grow flex items-center justify-center px-4 py-4 
  bg-[conic-gradient(from_45deg_at_60%_50%,#4f46e520_0deg,#ffffff_90deg,#7e22ce20_180deg,#ffffff_270deg,#4f46e520_360deg)] 
  relative 
  before:absolute before:inset-0 
  before:bg-gradient-to-br before:from-indigo-50/80 before:via-white/90 before:to-purple-50/80 
  before:backdrop-blur-3xl">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-xl rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

                        <div className="flex flex-col items-center mb-8">
                            <Link href="/" className="absolute left-6 top-6 text-gray-600 hover:text-gray-900">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                            <p className="text-gray-600 mt-2 text-center">
                                Sign in to continue to your Easmark
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-10"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="pl-10"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 
                                         hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 text-white 
                                         font-medium h-11"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>

                            <div className="text-center text-sm">
                                <Link
                                    href="/request-password-reset"
                                    className="text-indigo-600 hover:text-indigo-700"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            <div className="text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    href="/signup"
                                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}