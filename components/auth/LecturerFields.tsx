// import React from 'react';
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { LecturerFields as LecturerFieldsType } from '@/types/auth';

// interface LecturerFieldsProps {
//   formData: LecturerFieldsType;
//   updateFormData: (field: keyof LecturerFieldsType, value: string) => void;
// }

// export const LecturerFields: React.FC<LecturerFieldsProps> = ({ formData, updateFormData }) => (
//   <div className="space-y-6">
//     <h2 className="text-xl font-semibold text-gray-900">Lecturer Information</h2>
//     <div className="space-y-4">
//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700">Staff ID</label>
//         <Input
//           type="text"
//           placeholder="Enter your staff ID"
//           value={formData.staffId}
//           onChange={(e) => updateFormData('staffId', e.target.value)}
//         />
//       </div>

//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700">Department</label>
//         <Select
//           value={formData.department}
//           onValueChange={(value) => updateFormData('department', value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select your department" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="cs">Computer Science</SelectItem>
//             <SelectItem value="eng">Engineering</SelectItem>
//             <SelectItem value="bus">Business</SelectItem>
//             <SelectItem value="sci">Sciences</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700">Specialization</label>
//         <Input
//           type="text"
//           placeholder="Enter your area of specialization"
//           value={formData.specialization}
//           onChange={(e) => updateFormData('specialization', e.target.value)}
//         />
//       </div>

//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700">Highest Qualification</label>
//         <Select
//           value={formData.qualification}
//           onValueChange={(value) => updateFormData('qualification', value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select your qualification" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="phd">Ph.D.</SelectItem>
//             <SelectItem value="masters">Master's Degree</SelectItem>
//             <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   </div>
// );
