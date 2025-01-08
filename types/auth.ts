
export const USER_TYPES = {
  STUDENT: 'student',
  LECTURER: 'lecturer',
  INSTITUTION: 'institution',
  ADMIN: 'admin'
} as const;

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES];

export interface User
{
  email: string;
  uuid?: string;
  name: string;
  user_type: UserType;
  is_verified: boolean;
  role: string;
}

export interface AuthResponse
{
  status: string;
  access: string;
  user: User;
  message?: string;
  warning?: string;
}

export interface BasicInfo
{
  name: string;
  email: string;
  password: string;
  department: string;
}

export interface StudentFields extends BasicInfo
{
  courseOfStudy: string;
}

export interface LecturerFields extends BasicInfo { }

export interface InstitutionFields
{
  institutionName: string;
  email: string;
  password: string;
  institutionType: string;
  contactPersonName: string;
}

export interface UserProfile {
  uuid?: string;
  email: string;
  name: string;
  // user_type: 'student' | 'lecturer' | 'institution';
  user_type: string;
  role: string;
  is_verified: boolean;
  student_profile?: {
    department: string;
    course_of_study: string;
  } | null;
  lecturer_profile?: {
    department: string;
  } | null;
  institution_profile?: {
    institution_name: string;
    institution_type: string;
    contact_person_name: string;
  } | null;
}