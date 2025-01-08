"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useResendVerificationMutation, useVerifyEmailMutation } from "@/src/redux/features/auth/authApi";

export default function VerifyEmail() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email');
    
    const [verificationCode, setVerificationCode] = useState('');
    const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
    const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();

    // Redirect if no email in query params
    if (!email) {
        router.push('/signup');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!verificationCode.trim()) {
            toast.error('Please enter the verification code');
            return;
        }

        try {
            await toast.promise(
                verifyEmail({
                    email,
                    code: verificationCode
                }).unwrap(),
                {
                    loading: 'Verifying email...',
                    success: 'Email verified successfully! Redirecting...',
                    error: (err) => err?.data?.error || 'Failed to verify email'
                }
            );

            // Redirect to login after successful verification
            router.push('/email-verified');
            
        } catch (error) {
            console.error('Verification error:', error);
        }
    };

    const handleResendCode = async () => {
        try {
            await toast.promise(
                resendVerification({ email }).unwrap(),
                {
                    loading: 'Sending new code...',
                    success: 'New verification code sent!',
                    error: (err) => err?.data?.error || 'Failed to send code'
                }
            );
        } catch (error) {
            console.error('Resend error:', error);
        }
    };

    return (
        <main className="min-h-[calc(100vh-4rem)] pt-24 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-xl rounded-2xl p-8 relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
                    
                    <div className="flex flex-col items-center mb-6">
                        <Mail className="h-12 w-12 text-indigo-500 mb-4" />
                        <h1 className="text-2xl font-bold text-center text-gray-900">Verify Your Email</h1>
                        <p className="text-gray-600 text-center mt-2">
                            We've sent a verification code to <span className="font-medium">{email}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Verification Code</label>
                            <Input
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder="Enter verification code"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 
                                     hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 text-white h-11"
                            disabled={isVerifying}
                        >
                            {isVerifying ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                'Verify Email'
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Didn't receive the code?{' '}
                            <button
                                onClick={handleResendCode}
                                disabled={isResending}
                                className="text-indigo-600 hover:text-indigo-500 font-semibold disabled:opacity-50"
                            >
                                {isResending ? 'Sending...' : 'Resend Code'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}