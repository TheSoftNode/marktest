import { AdminActiveCouponsResponse, AdminAllCouponsResponse, ApplyCouponResponse, Coupon, CouponHistory, RevokeRequestBody, RevokeResponse, SessionCoupon, ValidateCouponResponse } from '@/types/coupon';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const couponApi = createApi({
    reducerPath: 'couponApi',
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
    tagTypes: ['Coupons', 'ActiveCoupons'],
    endpoints: (builder) => ({
        getUserCouponHistory: builder.query<CouponHistory, void>({
            query: () => '/coupons/history',
            providesTags: ['Coupons', 'ActiveCoupons'],
        }),

        revokeCoupon: builder.mutation<RevokeResponse, RevokeRequestBody>({
            query: (data) => ({
                url: '/coupons/action/revoke',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Coupons', 'ActiveCoupons'],
        }),

        getAdminAllCoupons: builder.query<AdminAllCouponsResponse, {
            user_id?: string;
            coupon_type?: string;
            from_date?: string;
            to_date?: string;
            status?: 'all' | 'active' | 'expired' | 'revoked' | 'inactive';
        }>({
            query: (params = {} ) => ({
                url: `/coupons/admin/all`,
                params,
            }),
            providesTags: ['Coupons', 'ActiveCoupons'],
        }),
        createCoupon: builder.mutation<Coupon, Partial<Coupon>>({
            query: (data) => ({
                url: '/coupons/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Coupons'],
        }),

        listCoupons: builder.query<Coupon[], void>({
            query: () => '/coupons',
            providesTags: ['Coupons'],
        }),

        getCoupon: builder.query<Coupon, string>({
            query: (code) => `/coupons/${code}`,
            providesTags: ['Coupons'],
        }),

        updateCoupon: builder.mutation<Coupon, { code: string; data: Partial<Coupon> }>({
            query: ({ code, data }) => ({
                url: `/coupons/${code}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Coupons', 'ActiveCoupons'],
        }),

        deleteCoupon: builder.mutation<void, string>({
            query: (code) => ({
                url: `/coupons/${code}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Coupons', 'ActiveCoupons'],
        }),

        applyCoupon: builder.mutation<ApplyCouponResponse, { code: string }>({
            query: (data) => ({
                url: '/coupons/action/apply/',
                method: 'POST',
                body: data,
            }),
            transformErrorResponse: (response: { status: number; data: any }) =>
            {
                return { status: response.status, data: response.data };
            },
            invalidatesTags: ['ActiveCoupons'],
        }),

        getActiveCoupons: builder.query<SessionCoupon[], void>({
            query: () => '/coupons/action/active',
            providesTags: ['ActiveCoupons'],
        }),

        validateCoupon: builder.mutation<ValidateCouponResponse, { code: string }>({
            query: (data) => ({
                url: '/coupons/action/validate/',
                method: 'POST',
                body: data,
            }),
            transformErrorResponse: (response: { status: number; data: any }) =>
            {
                return { status: response.status, data: response.data };
            },
        }),

        getAdminActiveCoupons: builder.query<AdminActiveCouponsResponse, {
            user_id?: string;
            include_expired?: boolean;
            coupon_type?: string;
        }>({
            query: (params = {}) => ({
                url: `/coupons/admin/active`,
                params,
            }),
            providesTags: ['ActiveCoupons'],
        }),
    }),
});

export const {
    useGetUserCouponHistoryQuery,
    useRevokeCouponMutation,
    useGetAdminAllCouponsQuery,
    useCreateCouponMutation,
    useListCouponsQuery,
    useGetCouponQuery,
    useUpdateCouponMutation,
    useDeleteCouponMutation,
    useApplyCouponMutation,
    useGetActiveCouponsQuery,
    useValidateCouponMutation,
    useGetAdminActiveCouponsQuery,
} = couponApi;