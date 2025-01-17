import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Usage, Payment, Balance, Transaction, CreditUsageResponse, CreditPricingTier, CreditPriceCalculation } from '@/types/credits';

export const creditsApi = createApi({
    reducerPath: 'creditsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
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
    tagTypes: ['Credits', 'Transactions'],
    endpoints: (builder) => ({
        getCreditUsage: builder.query<CreditUsageResponse, void>({
            query: () => '/credits/get-usage',
            providesTags: ['Credits'],
        }),

        recordUsage: builder.mutation<{ usage: Usage; new_balance: Balance }, { credit_usage: number }>({
            query: (data) => ({
                url: '/credits/usage/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Credits', 'Transactions'],
        }),

        recordPayment: builder.mutation<{ payment: Payment; new_balance: Balance }, { credit_amount: number, dollar_amount: number }>({
            query: (data) => ({
                url: '/credits/payment/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Credits', 'Transactions'],
        }),

        getBalance: builder.query<{ credit_balance?: number, dollar_balance?: number }, void>({
            query: () => '/credits/balance',
            providesTags: ['Credits'],
        }),

        getTransactionHistory: builder.query<Transaction[], {
            start_date?: string;
            end_date?: string;
        }>({
            query: (params = {}) => ({
                url: '/credits/history/',
                params,
            }),
            providesTags: ['Transactions'],
        }),

        getPricingTiers: builder.query<CreditPricingTier[], { is_active?: boolean, tier_type?: string; }>({
            query: (params = {}) => ({
                url: '/credits/pricing-tiers/',
                params,
            }),
            providesTags: ['Credits'],
        }),

        createPricingTier: builder.mutation<CreditPricingTier, Partial<CreditPricingTier>>({
            query: (data) => ({
                url: '/credits/pricing-tiers/create/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Credits'],
        }),

        updatePricingTier: builder.mutation<CreditPricingTier, { tier_id: number; data: Partial<CreditPricingTier> }>({
            query: ({ tier_id, data }) => ({
                url: `/credits/pricing-tiers/${tier_id}/update/`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Credits'],
        }),

        calculateCreditPrice: builder.mutation<CreditPriceCalculation, { credit_amount: number; tier_type: string; }>({
            query: (data) => ({
                url: '/credits/pricing-tiers/calculate/',
                method: 'POST',
                body: data,
            }),
        }),

        createCheckoutSession: builder.mutation<
            { checkout_url: string },
            { credit_amount: number; dollar_amount: number; tier_type: string }
        >({
            query: (data) => ({
                url: '/credits/create-checkout-session/',
                method: 'POST',
                body: data,
            }),
        }),

    }),
});

export const {
    useGetCreditUsageQuery,
    useRecordUsageMutation,
    useRecordPaymentMutation,
    useGetBalanceQuery,
    useGetTransactionHistoryQuery,
    useGetPricingTiersQuery,
    useCreatePricingTierMutation,
    useUpdatePricingTierMutation,
    useCalculateCreditPriceMutation,
    useCreateCheckoutSessionMutation,
} = creditsApi;
