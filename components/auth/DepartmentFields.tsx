// import React from 'react';
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { DepartmentFields as DepartmentFieldsType } from '@/types/auth';

// interface DepartmentFieldsProps {
//   formData: DepartmentFieldsType;
//   updateFormData: (field: keyof DepartmentFieldsType, value: string) => void;
// }

// export const DepartmentFields: React.FC<DepartmentFieldsProps> = ({ formData, updateFormData }) => (
//   <div className="space-y-6">
//     <h2 className="text-xl font-semibold text-gray-900">Department Information</h2>
//     <div className="space-y-4">
//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700">Department Name</label>
//         <Input
//           type="text"
//           placeholder="Enter department name"
//           value={formData.departmentName}
//           onChange={(e) => updateFormData('departmentName', e.target.value)}
//         />
//       </div>

//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700">Department Code</label>
//         <Input
//           type="text"
//           placeholder="Enter department code"
//           value={formData.departmentCode}
//           onChange={(e) => updateFormData('departmentCode', e.target.value)}
//         />
//       </div>

//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700">Faculty</label>
//         <Select
//           value={formData.facultyName}
//           onValueChange={(value) => updateFormData('facultyName', value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select faculty" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="science">Faculty of Science</SelectItem>
//             <SelectItem value="engineering">Faculty of Engineering</SelectItem>
//             <SelectItem value="business">Faculty of Business</SelectItem>
//             <SelectItem value="arts">Faculty of Arts</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700">Contact Person</label>
//         <Input
//           type="text"
//           placeholder="Enter contact person name"
//           value={formData.contactPerson}
//           onChange={(e) => updateFormData('contactPerson', e.target.value)}
//         />
//       </div>
//     </div>
//   </div>
// );