import { Analysis, AnalysisHistoryResponse, AnalysisStats, AnalysisType, CodeAnalysis, GlobalAnalytics, PerformAnalysisResponse, ThesisAnalysis, UserAnalytics } from '@/types/analysis';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const analysisApi = createApi({
  reducerPath: 'analysisApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/analysis`,
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
  tagTypes: ['Analytics', 'AnalyticsStats'],
  endpoints: (builder) => ({
    performAnalysis: builder.mutation<PerformAnalysisResponse, 
    { analysis_type: string, 
      credit_usage?: number,
      coupon_code?: string,
     }>({
      query: (data) => ({
        url: '/perform/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Analytics', 'AnalyticsStats'],
    }),

    getUserAnalytics: builder.query<UserAnalytics, void>({
      query: () => '/user-analytics/',
      providesTags: ['AnalyticsStats'],
    }),

    getAnalysisHistory: builder.query<Analysis[], void>({
      query: () => '/history/',
      providesTags: ['Analytics'],
    }),

    getGlobalAnalytics: builder.query<GlobalAnalytics, void>({
      query: () => '/global-analytics/',
      providesTags: ['AnalyticsStats'],
    }),

    getAnalysisTypes: builder.query<AnalysisType[], void>({
      query: () => '/types/',
      providesTags: ['Analytics'],
    }),

    createAnalysisType: builder.mutation<AnalysisType, { name: string; base_cost: number; description?: string }>({
      query: (data) => ({
        url: '/types/create/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Analytics'],
    }),


    getAnalysisStats: builder.query<AnalysisStats, void>({
      query: () => '/stats/',
      providesTags: ['Analytics'],
    }),

    getAnalysisRecordHistory: builder.query<{
      thesis: ThesisAnalysis[];
      code: CodeAnalysis[];
    }, void>({
      query: () => '/record/history/',
      providesTags: ['Analytics'],
    }),

    saveAnalysisResult: builder.mutation<ThesisAnalysis | CodeAnalysis, {
      analysis_type: 'thesis' | 'code';
      marking: Record<string, number>;
      Reason_for_mark: Record<string, string>;
    }>({
      query: (data) => ({
        url: '/save/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Analytics'],
    }),

    getMyAnalysisHistory: builder.query<AnalysisHistoryResponse, void>({
      query: () => '/my-history/',
      providesTags: ['Analytics'],
    }),

    updateAnalysis: builder.mutation<ThesisAnalysis | CodeAnalysis, {
      analysis_id: number;
      analysis_type: 'thesis' | 'code';
      data: Partial<ThesisAnalysis | CodeAnalysis>;
    }>({
      query: ({ analysis_id, ...data }) => ({
        url: `/single/${analysis_id}/update/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Analytics'],
    }),

  }),
});

export const {
  usePerformAnalysisMutation,
  useGetUserAnalyticsQuery,
  useGetAnalysisHistoryQuery,
  useGetGlobalAnalyticsQuery,
  useGetAnalysisTypesQuery,
  useCreateAnalysisTypeMutation,
  useGetAnalysisStatsQuery,
  useGetAnalysisRecordHistoryQuery,
  useSaveAnalysisResultMutation,
  useUpdateAnalysisMutation,
  useGetMyAnalysisHistoryQuery,
} = analysisApi;