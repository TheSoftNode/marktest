// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { KeyRound, Loader2 } from "lucide-react";
// import { useState } from "react";

// export default function PasswordReset()
// {
//   const [formData, setFormData] = useState({
//     password: '',
//     confirmPassword: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) =>
//   {
//     e.preventDefault();
//     setIsLoading(true);
//     try
//     {
//       // Add API call here
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       console.log('Password reset:', formData);
//     } finally
//     {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-[calc(100vh-4rem)] p-8 flex items-center justify-center 
//       bg-[conic-gradient(from_45deg_at_60%_50%,#4f46e520_0deg,#ffffff_90deg,#7e22ce20_180deg,#ffffff_270deg,#4f46e520_360deg)] 
//   relative 
//   before:absolute before:inset-0 
//   before:bg-gradient-to-br before:from-indigo-50/80 before:via-white/90 before:to-purple-50/80 
//   before:backdrop-blur-3xl">
//       <div className="w-full max-w-md">
//         <div className="bg-white shadow-xl rounded-2xl p-8 relative overflow-hidden">
//           <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

//           <div className="flex flex-col items-center mb-6">
//             <KeyRound className="h-12 w-12 text-indigo-500 mb-4" />
//             <h1 className="text-2xl font-bold text-center text-gray-900">Create New Password</h1>
//             <p className="text-gray-600 text-center mt-2">
//               Please enter your new password below.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">New Password</label>
//               <Input
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
//                 placeholder="Enter new password"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//               <Input
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
//                 placeholder="Confirm new password"
//                 required
//               />
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 
//                            hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 text-white"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Updating Password...
//                 </>
//               ) : (
//                 'Update Password'
//               )}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/src/redux/features/auth/authApi";

export default function PasswordReset() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token || !email) {
      toast.error("Invalid reset link. Please request a new password reset.");
      return;
    }

    try {
      const response = await resetPassword({
        email,
        token,
        new_password: formData.password
      }).unwrap();


      toast.success(response.message || "Password has been reset successfully");

      // Redirect to login after successful reset
      router.push('/login');
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to reset password");
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] p-8 flex items-center justify-center 
      bg-[conic-gradient(from_45deg_at_60%_50%,#4f46e520_0deg,#ffffff_90deg,#7e22ce20_180deg,#ffffff_270deg,#4f46e520_360deg)] 
      relative before:absolute before:inset-0 
      before:bg-gradient-to-br before:from-indigo-50/80 before:via-white/90 before:to-purple-50/80 
      before:backdrop-blur-3xl">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

          <div className="flex flex-col items-center mb-6">
            <KeyRound className="h-12 w-12 text-indigo-500 mb-4" />
            <h1 className="text-2xl font-bold text-center text-gray-900">Create New Password</h1>
            <p className="text-gray-600 text-center mt-2">
              Please enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter new password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm new password"
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
                  Updating Password...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}