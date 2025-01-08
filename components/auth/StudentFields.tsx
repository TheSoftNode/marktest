// import React from 'react';
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { StudentFields as StudentFieldsType } from '@/types/auth';

// interface StudentFieldsProps {
//   formData: StudentFieldsType;
//   updateFormData: (field: keyof StudentFieldsType, value: string) => void;
// }

// export const StudentFields: React.FC<StudentFieldsProps> = ({ formData, updateFormData }) => (
//   <div className="space-y-6">
//     <h2 className="text-xl font-semibold text-gray-900">Student Information</h2>
//     <div className="space-y-4">
//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700">Student ID</label>
//         <Input
//           type="text"
//           placeholder="Enter your student ID"
//           value={formData.studentId}
//           onChange={(e) => updateFormData('studentId', e.target.value)}
//         />
//       </div>

//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700">Course</label>
//         <Select
//           value={formData.course}
//           onValueChange={(value) => updateFormData('course', value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select your course" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="cs">Computer Science</SelectItem>
//             <SelectItem value="eng">Engineering</SelectItem>
//             <SelectItem value="bus">Business Administration</SelectItem>
//             <SelectItem value="arts">Arts and Humanities</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700">Year of Study</label>
//         <Select
//           value={formData.yearOfStudy}
//           onValueChange={(value) => updateFormData('yearOfStudy', value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select your year of study" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="1">First Year</SelectItem>
//             <SelectItem value="2">Second Year</SelectItem>
//             <SelectItem value="3">Third Year</SelectItem>
//             <SelectItem value="4">Fourth Year</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   </div>
// );