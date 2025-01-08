"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRequestPasswordResetMutation } from "@/src/redux/features/auth/authApi";
import { KeyRound, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RequestPasswordReset() {
    const [email, setEmail] = useState('');
    const [requestReset, { isLoading }] = useRequestPasswordResetMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await requestReset({ email }).unwrap();
            toast.success(response.message || "Password reset instructions sent to your email");
            setEmail(''); 
        } catch (error: any) {
            toast.error(error.data?.message || "Failed to send reset instructions");
        }
    };

    return (
        <main className="min-h-[calc(100vh-4rem)] p-8 flex items-center justify-center bg-[conic-gradient(from_45deg_at_60%_50%,#4f46e520_0deg,#ffffff_90deg,#7e22ce20_180deg,#ffffff_270deg,#4f46e520_360deg)] 
            relative before:absolute before:inset-0 
            before:bg-gradient-to-br before:from-indigo-50/80 before:via-white/90 before:to-purple-50/80 
            before:backdrop-blur-3xl">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-xl rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

                    <div className="flex flex-col items-center mb-6">
                        <KeyRound className="h-12 w-12 text-indigo-500 mb-4" />
                        <h1 className="text-2xl font-bold text-center text-gray-900">Reset Password</h1>
                        <p className="text-gray-600 text-center mt-2">
                            Enter your email address and we'll send you instructions to reset your password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 
                                   hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending Instructions...
                                </>
                            ) : (
                                'Send Reset Instructions'
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-sm text-indigo-600 hover:text-indigo-500">
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}