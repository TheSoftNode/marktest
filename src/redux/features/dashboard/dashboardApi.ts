import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ActivityItem, CreditTransaction, UsageStats, AnalyticsData } from '@/types/dashboard';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/dashboard',
        prepareHeaders: (headers) =>
        {
            const token = localStorage.getItem('token');
            if (token)
            {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Activity', 'Credits', 'Usage'],
    endpoints: (builder) => ({
        getUsageStats: builder.query<UsageStats, void>({
            query: () => '/dashboard/stats',
            providesTags: ['Usage'],
        }),

        getRecentActivity: builder.query<ActivityItem[], void>({
            query: () => '/dashboard/activity',
            providesTags: ['Activity'],
        }),

        getCreditHistory: builder.query<CreditTransaction[], void>({
            query: () => '/dashboard/credits/history',
            providesTags: ['Credits'],
        }),

        getAnalytics: builder.query<AnalyticsData, void>({
            query: () => '/dashboard/analytics',
            providesTags: ['Usage'],
        }),

        purchaseCredits: builder.mutation<
            { success: boolean; message: string },
            { amount: number; paymentMethodId: string }
        >({
            query: (data) => ({
                url: '/dashboard/credits/purchase',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Credits', 'Usage'],
        }),

        applyCoupon: builder.mutation<
            { success: boolean; message: string; credits?: number },
            { code: string }
        >({
            query: (data) => ({
                url: '/dashboard/credits/coupon',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Credits', 'Usage'],
        }),

        startNewAnalysis: builder.mutation<
            { success: boolean; analysisId: string },
            FormData
        >({
            query: (data) => ({
                url: '/analysis/start',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Activity', 'Credits', 'Usage'],
        }),
    }),
});

export const {
    useGetUsageStatsQuery,
    useGetRecentActivityQuery,
    useGetCreditHistoryQuery,
    useGetAnalyticsQuery,
    usePurchaseCreditsMutation,
    useApplyCouponMutation,
    useStartNewAnalysisMutation,
} = dashboardApi;