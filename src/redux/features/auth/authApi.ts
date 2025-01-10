import { AuthResponse, CustomError, SignupRequest, UserProfile } from '@/types/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/users`,
  prepareHeaders: (headers) =>
  {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token)
    {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
      const error = result.error as CustomError;
      if (error.data?.code === "token_not_valid") {
          // Try to refresh token
          const token = localStorage.getItem('token');
          
          // Attempt to get a new token
          const refreshResult = await api.dispatch(
              authApi.endpoints.refreshToken.initiate({ access_token: token || '' })
          );

          if (refreshResult.data) {
              // Retry the original request with new token
              result = await baseQuery(args, api, extraOptions);
          } else {
              // If refresh failed, redirect to login
              localStorage.removeItem('token');
              window.location.href = '/login';
          }
      }
  }

  return result;
};



export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
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