import { UserProfile } from '@/types/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type SignupRequest = {
  email: string;
  password: string;
  name: string;
  user_type: 'student' | 'lecturer' | 'institution';
} & (
    | {
      user_type: 'student';
      student_profile: {
        department: string;
        course_of_study: string;
      };
    }
    | {
      user_type: 'lecturer';
      lecturer_profile: {
        department: string;
      };
    }
    | {
      user_type: 'institution';
      institution_profile: {
        institution_name: string;
        institution_type: string;
        contact_person_name: string;
      };
    }
  );

interface AuthResponse
{
  status: string;
  access: string;
  user: {
    email: string;
    name: string;
    user_type: string;
    is_verified: boolean;
    role: string;
  };
  message?: string;
  warning?: string;
}


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/users`,
    prepareHeaders: (headers) =>
    {
      // Get token from localStorage instead of Redux state
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token)
      {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (credentials) => ({
        url: '/signup/',
        method: 'POST',
        body: credentials,
      }),
      // Handle token storage on successful signup
      onQueryStarted: async (_, { queryFulfilled }) =>
      {
        try
        {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.access);
        } catch { }
      },
    }),
    verifyEmail: builder.mutation<{ message: string }, { email: string; code: string }>({
      query: (data) => ({
        url: '/verify-email/',
        method: 'POST',
        body: data,
      }),
    }),
    resendVerification: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/resend-verification/',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/login/',
        method: 'POST',
        body: credentials,
      }),
      // Handle token storage on successful login
      onQueryStarted: async (_, { queryFulfilled }) =>
      {
        try
        {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.access);
        } catch { }
      },
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/logout/',
        method: 'POST',
      }),
      // Clear token on logout
      onQueryStarted: async (_, { queryFulfilled }) =>
      {
        try
        {
          await queryFulfilled;
          localStorage.removeItem('token');
        } catch { }
      },
    }),
    getMe: builder.query<{ user: AuthResponse['user'] }, void>({
      query: () => ({ url: '/me' }),
    }),
    refreshToken: builder.mutation<{ access: string }, { access_token: string }>({
      query: (data) => ({
        url: '/refresh/',
        method: 'POST',
        body: data,
      }),
      // Update stored token
      onQueryStarted: async (_, { queryFulfilled }) =>
      {
        try
        {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.access);
        } catch { }
      },
    }),
    requestPasswordReset: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/password/reset/',
        method: 'POST',
        body: data,
      }),
    }),
    updateProfile: builder.mutation<{ message: string }, Partial<UserProfile>>({
      query: (data) => ({
        url: '/profile/update/',
        method: 'PUT',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      { message: string },
      { email: string; token: string; new_password: string }
    >({
      query: (data) => ({
        url: '/password/reset/confirm/',
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation<
      { message: string },
      { old_password: string; new_password: string }
    >({
      query: (data) => ({
        url: '/password/change/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useRefreshTokenMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = authApi;