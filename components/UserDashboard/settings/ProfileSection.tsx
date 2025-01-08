// import React from 'react';
// import { User, Mail } from 'lucide-react';
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import toast from 'react-hot-toast';
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useResendVerificationMutation } from '@/src/redux/features/auth/authApi';
// import { UserProfile } from '@/types/auth';

// interface ProfileSectionProps {
//   user: UserProfile;
//   onUpdateProfile: (updatedFields: Partial<UserProfile>) => void;
// }

// export const ProfileSection: React.FC<ProfileSectionProps> = ({ user, onUpdateProfile }) => {
//   const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();

//   const handleResendVerification = async () => {
//     try {
//       await resendVerification({ email: user.email }).unwrap();
//       toast.success('Verification email sent successfully');
//     } catch (error) {
//       toast.error('Failed to send verification email');
//     }
//   };

//   const renderProfileFields = () => {
//     switch (user.user_type) {
//       case 'student':
//         return (
//           <>
//             <div className="space-y-2">
//               <Label htmlFor="department">Department</Label>
//               <Input
//                 id="department"
//                 value={user.student_profile?.department || ''}
//                 onChange={(e) => onUpdateProfile({
//                   student_profile: {
//                     ...user.student_profile!,
//                     department: e.target.value
//                   }
//                 })}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="course">Course of Study</Label>
//               <Input
//                 id="course"
//                 value={user.student_profile?.course_of_study || ''}
//                 onChange={(e) => onUpdateProfile({
//                   student_profile: {
//                     ...user.student_profile!,
//                     course_of_study: e.target.value
//                   }
//                 })}
//               />
//             </div>
//           </>
//         );

//       case 'lecturer':
//         return (
//           <div className="space-y-2">
//             <Label htmlFor="department">Department</Label>
//             <Input
//               id="department"
//               value={user.lecturer_profile?.department || ''}
//               onChange={(e) => onUpdateProfile({
//                 lecturer_profile: {
//                   ...user.lecturer_profile!,
//                   department: e.target.value
//                 }
//               })}
//             />
//           </div>
//         );

//       case 'institution':
//         return (
//           <>
//             <div className="space-y-2">
//               <Label htmlFor="institutionName">Institution Name</Label>
//               <Input
//                 id="institutionName"
//                 value={user.institution_profile?.institution_name || ''}
//                 onChange={(e) => onUpdateProfile({
//                   institution_profile: {
//                     ...user.institution_profile!,
//                     institution_name: e.target.value
//                   }
//                 })}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="institutionType">Institution Type</Label>
//               <Input
//                 id="institutionType"
//                 value={user.institution_profile?.institution_type || ''}
//                 onChange={(e) => onUpdateProfile({
//                   institution_profile: {
//                     ...user.institution_profile!,
//                     institution_type: e.target.value
//                   }
//                 })}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="contactPerson">Contact Person Name</Label>
//               <Input
//                 id="contactPerson"
//                 value={user.institution_profile?.contact_person_name || ''}
//                 onChange={(e) => onUpdateProfile({
//                   institution_profile: {
//                     ...user.institution_profile!,
//                     contact_person_name: e.target.value
//                   }
//                 })}
//               />
//             </div>
//           </>
//         );
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {!user.is_verified && (
//         <Alert variant="destructive">
//           <AlertDescription>
//             Your email is not verified. Please verify your email to access all features.
//             {!isResending ? (
//               <Button 
//                 variant="link" 
//                 onClick={handleResendVerification}
//                 className="ml-2 p-0 h-auto font-semibold"
//               >
//                 Resend verification email
//               </Button>
//             ) : (
//               <span className="ml-2">Sending verification email...</span>
//             )}
//           </AlertDescription>
//         </Alert>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <Label htmlFor="name">Full Name</Label>
//           <Input
//             id="name"
//             value={user.name}
//             onChange={(e) => onUpdateProfile({ name: e.target.value })}
//           />
//         </div>
        
//         <div className="space-y-2">
//           <Label htmlFor="email">Email Address</Label>
//           <div className="flex items-center space-x-2">
//             <Input
//               id="email"
//               type="email"
//               value={user.email}
//               disabled
//               className="bg-gray-50"
//             />
//           </div>
//         </div>

//         {renderProfileFields()}
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { User, Mail, Loader2, Save } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useResendVerificationMutation, useUpdateProfileMutation } from '@/src/redux/features/auth/authApi';
import { UserProfile } from '@/types/auth';

interface ProfileSectionProps {
  user: UserProfile;
  onUpdateProfile: (updatedFields: Partial<UserProfile>) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  const [formData, setFormData] = useState<UserProfile>(user);
  const [hasChanges, setHasChanges] = useState(false);

  const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  useEffect(() => {
    setFormData(user);
  }, [user]);

  useEffect(() => {
    const hasProfileChanges = JSON.stringify(formData) !== JSON.stringify(user);
    setHasChanges(hasProfileChanges);
  }, [formData, user]);

  const handleResendVerification = async () => {
    try {
      const response = await resendVerification({ email: user.email }).unwrap();
      toast.success(response?.message || 'Verification email sent successfully');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to send verification email');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Filter out the fields that shouldn't be updated
      const updateData: Partial<UserProfile> = {
        name: formData.name,
      };

      // Add profile-specific fields based on user type
      switch (formData.user_type) {
        case 'student':
          if (formData.student_profile) {
            updateData.student_profile = {
              department: formData.student_profile.department,
              course_of_study: formData.student_profile.course_of_study
            };
          }
          break;
        case 'lecturer':
          if (formData.lecturer_profile) {
            updateData.lecturer_profile = {
              department: formData.lecturer_profile.department
            };
          }
          break;
        case 'institution':
          if (formData.institution_profile) {
            updateData.institution_profile = {
              institution_name: formData.institution_profile.institution_name,
              institution_type: formData.institution_profile.institution_type,
              contact_person_name: formData.institution_profile.contact_person_name
            };
          }
          break;
      }

      const response = await updateProfile(updateData).unwrap();
      toast.success(response?.message || 'Profile updated successfully');
      setHasChanges(false);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update profile');
    }
  };

  const renderProfileFields = () => {
    switch (formData.user_type) {
      case 'student':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.student_profile?.department || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  student_profile: {
                    ...prev.student_profile!,
                    department: e.target.value
                  }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course of Study</Label>
              <Input
                id="course"
                value={formData.student_profile?.course_of_study || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  student_profile: {
                    ...prev.student_profile!,
                    course_of_study: e.target.value
                  }
                }))}
              />
            </div>
          </>
        );

      case 'lecturer':
        return (
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={formData.lecturer_profile?.department || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                lecturer_profile: {
                  ...prev.lecturer_profile!,
                  department: e.target.value
                }
              }))}
            />
          </div>
        );

      case 'institution':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="institutionName">Institution Name</Label>
              <Input
                id="institutionName"
                value={formData.institution_profile?.institution_name || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  institution_profile: {
                    ...prev.institution_profile!,
                    institution_name: e.target.value
                  }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institutionType">Institution Type</Label>
              <Input
                id="institutionType"
                value={formData.institution_profile?.institution_type || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  institution_profile: {
                    ...prev.institution_profile!,
                    institution_type: e.target.value
                  }
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person Name</Label>
              <Input
                id="contactPerson"
                value={formData.institution_profile?.contact_person_name || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  institution_profile: {
                    ...prev.institution_profile!,
                    contact_person_name: e.target.value
                  }
                }))}
              />
            </div>
          </>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!user.is_verified && (
        <Alert variant="destructive">
          <AlertDescription>
            Your email is not verified. Please verify your email to access all features.
            {!isResending ? (
              <Button 
                variant="link" 
                onClick={handleResendVerification}
                className="ml-2 p-0 h-auto font-semibold"
              >
                Resend verification email
              </Button>
            ) : (
              <span className="ml-2">Sending verification email...</span>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              name: e.target.value
            }))}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="email"
              type="email"
              value={formData.email}
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>

        {renderProfileFields()}
      </div>

      <Button 
        type="submit"
        disabled={!hasChanges || isUpdating}
        className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 
                 hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600 text-white
                 transition-all duration-300 ease-in-out"
      >
        {isUpdating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Updating Profile...
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </>
        )}
      </Button>
    </form>
  );
};