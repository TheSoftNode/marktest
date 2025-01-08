"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Building2, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSignupMutation } from '@/src/redux/features/auth/authApi';
import { USER_TYPES, UserType } from '@/types/auth';

// export enum USER_TYPES
// {
//     STUDENT = 'student',
//     LECTURER = 'lecturer',
//     INSTITUTION = 'institution'
// }

// export type UserType = `${USER_TYPES}`;
// export type UserType = `${UserType}`;

export default function SignupPage()
{
    const router = useRouter();
    const [signup, { isLoading }] = useSignupMutation();
    const [userType, setUserType] = useState<UserType | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: '',
        courseOfStudy: '',
        // institutionName: '',
        institutionType: '',
        contactPersonName: '',
    });

    const handleInputChange = (field: string, value: string) =>
    {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();

        if (!userType)
        {
            toast.error('Please select a user type');
            return;
        }

        if (formData.password !== formData.confirmPassword)
        {
            toast.error('Passwords do not match');
            return;
        }

        try
        {
            let signupData;
            const baseData = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
            };

            // Type-safe way to construct the signup data
            if (userType === USER_TYPES.STUDENT)
            {
                signupData = {
                    ...baseData,
                    user_type: USER_TYPES.STUDENT,
                    student_profile: {
                        department: formData.department,
                        course_of_study: formData.courseOfStudy,
                    }
                } as const;
            } else if (userType === USER_TYPES.LECTURER)
            {
                signupData = {
                    ...baseData,
                    user_type: USER_TYPES.LECTURER,
                    lecturer_profile: {
                        department: formData.department,
                    }
                } as const;
            } else
            {
                signupData = {
                    ...baseData,
                    user_type: USER_TYPES.INSTITUTION,
                    institution_profile: {
                        institution_name: formData.name,
                        institution_type: formData.institutionType,
                        contact_person_name: formData.contactPersonName,
                    }
                } as const;
            }

            await toast.promise(
                signup(signupData).unwrap(),
                {
                    loading: 'Creating account...',
                    success: 'Account created! Please check your email for verification.',
                    error: (err) => err?.data?.error || 'Failed to create account'
                }
            );

            router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);

        } catch (error)
        {
            console.error('Signup error:', error);
        }
    };
    const userTypeOptions = [
        {
            type: USER_TYPES.STUDENT,
            title: 'Student',
            description: 'Submit assignments and receive AI-powered feedback',
            icon: GraduationCap,
            color: 'blue'
        },
        {
            type: USER_TYPES.LECTURER,
            title: 'Lecturer',
            description: 'Grade assignments and manage courses with AI assistance',
            icon: BookOpen,
            color: 'indigo'
        },
        {
            type: USER_TYPES.INSTITUTION,
            title: 'Academic Institution',
            description: 'Manage courses and oversee academic programs',
            icon: Building2,
            color: 'violet'
        }
    ];

    return (
        // <main className="min-h-[calc(100vh-4rem)] pt-28 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <main className="min-h-[calc(100vh-4rem)]  p-8 flex items-center justify-center bg-[conic-gradient(from_45deg_at_60%_50%,#4f46e520_0deg,#ffffff_90deg,#7e22ce20_180deg,#ffffff_270deg,#4f46e520_360deg)] 
  relative 
  before:absolute before:inset-0 
  before:bg-gradient-to-br before:from-indigo-50/80 before:via-white/90 before:to-purple-50/80 
  before:backdrop-blur-3xl">
            <div className="w-full max-w-4xl">
                <div className="bg-white shadow-xl rounded-2xl p-8 relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

                    <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Join AI Grading Revolution</h1>
                    <p className="text-gray-600 text-center mb-8">
                        Streamline your academic workflow with AI-powered grading
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
                            {userTypeOptions.map(({ type, title, description, icon: Icon, color }) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setUserType(userType === type ? null : type)}
                                    className={`
        flex flex-col items-center p-6 rounded-lg border-2 transition-all duration-300
        ${userType === type
                                            ? 'border-indigo-500 bg-indigo-50 shadow-lg transform scale-105'
                                            : 'border-gray-200 hover:border-gray-300 hover:shadow'}
    `}
                                >
                                    <Icon className={`h-10 w-10 text-indigo-500 mb-3`} />
                                    <h3 className="font-semibold text-gray-900">{title}</h3>
                                    <p className="mt-2 text-sm text-gray-500 text-center">{description}</p>
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {userType && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    {userType === USER_TYPES.INSTITUTION ? (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Institution Name</label>
                                                <Input
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    placeholder="Enter institution name"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Institution Type</label>
                                                <Select
                                                    value={formData.institutionType}
                                                    onValueChange={(value) => handleInputChange('institutionType', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select institution type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="university">University</SelectItem>
                                                        <SelectItem value="college">College</SelectItem>
                                                        <SelectItem value="highschool">High School</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Contact Person Name</label>
                                                <Input
                                                    value={formData.contactPersonName}
                                                    onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                                                    placeholder="Enter contact person's name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                                <Input
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    placeholder="Enter your full name"
                                                    required
                                                />
                                            </div>

                                            {userType === USER_TYPES.STUDENT && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Course of Study</label>
                                                    <Select
                                                        value={formData.courseOfStudy}
                                                        onValueChange={(value) => handleInputChange('courseOfStudy', value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select your course" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="cs">Computer Science</SelectItem>
                                                            <SelectItem value="eng">Engineering</SelectItem>
                                                            <SelectItem value="bus">Business Administration</SelectItem>
                                                            <SelectItem value="arts">Arts and Humanities</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                                <Select
                                                    value={formData.department}
                                                    onValueChange={(value) => handleInputChange('department', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select department" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="cs">Computer Science</SelectItem>
                                                        <SelectItem value="eng">Engineering</SelectItem>
                                                        <SelectItem value="bus">Business</SelectItem>
                                                        <SelectItem value="arts">Arts</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Password</label>
                                            <Input
                                                type="password"
                                                value={formData.password}
                                                onChange={(e) => handleInputChange('password', e.target.value)}
                                                placeholder="Create a password"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                            <Input
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                                placeholder="Confirm your password"
                                                required
                                            />
                                        </div>
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
                                                Creating account...
                                            </>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-semibold text-indigo-600 hover:text-indigo-500 
                                  transition-colors duration-200"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}