// import React from 'react';
// import { GraduationCap, BookOpen, Building2 } from 'lucide-react';
// import { RadioGroup } from "@/components/ui/radio-group";
// import { USER_TYPES, UserType } from '@/types/auth';

// interface UserTypeSelectorProps {
//   userType: UserType | '';
//   setUserType: (type: UserType) => void;
// }

// export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ userType, setUserType }) => {
//   const userTypeOptions = [
//     {
//       id: USER_TYPES.STUDENT,
//       title: 'Student',
//       description: 'Submit assignments and receive AI-powered feedback',
//       icon: GraduationCap,
//       color: 'blue'
//     },
//     {
//       id: USER_TYPES.LECTURER,
//       title: 'Lecturer',
//       description: 'Grade assignments and manage courses with AI assistance',
//       icon: BookOpen,
//       color: 'indigo'
//     },
//     {
//       id: USER_TYPES.DEPARTMENT,
//       title: 'Department',
//       description: 'Manage courses and oversee academic programs',
//       icon: Building2,
//       color: 'violet'
//     }
//   ] as const;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-semibold text-gray-900">Select User Type</h2>
//       <RadioGroup 
//         value={userType}
//         onValueChange={(value) => setUserType(value as UserType)}
//         className="grid grid-cols-1 gap-4 sm:grid-cols-3"
//       >
//         {userTypeOptions.map(({ id, title, description, icon: Icon, color }) => {
//           const isSelected = userType === id;
//           return (
//             <button
//               key={id}
//               type="button"
//               onClick={() => setUserType(id)}
//               className={`
//                 group relative flex flex-col items-center space-y-2 rounded-lg 
//                 border-2 p-4 transition-all duration-200 
//                 hover:border-${color}-500 hover:bg-${color}-50/50
//                 ${isSelected ? `border-${color}-500 bg-${color}-50` : 'border-gray-200'}
//                 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2
//               `}
//             >
//               <Icon 
//                 className={`h-8 w-8 text-${color}-500`} 
//                 aria-hidden="true" 
//               />
//               <span className="font-medium text-gray-900">
//                 {title}
//               </span>
//               <p className="text-sm text-gray-500 text-center">
//                 {description}
//               </p>
//               <input
//                 type="radio"
//                 name="userType"
//                 value={id}
//                 checked={isSelected}
//                 onChange={() => setUserType(id)}
//                 className="sr-only"
//                 aria-labelledby={`${id}-label`}
//               />
//               <span 
//                 className={`
//                   absolute inset-0 rounded-lg ring-2 ring-transparent
//                   transition-all duration-200
//                   ${isSelected ? `ring-${color}-500` : 'group-hover:ring-${color}-500/50'}
//                 `}
//                 aria-hidden="true"
//               />
//             </button>
//           );
//         })}
//       </RadioGroup>
//     </div>
//   );
// };