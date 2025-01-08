import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/auth/authApi';
import { dashboardApi } from './features/dashboard/dashboardApi';
import { analysisApi } from './features/dashboard/analysisApi';
import { couponApi } from './features/dashboard/couponApi';
import { creditsApi } from './features/dashboard/creditsApi';


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [analysisApi.reducerPath]: analysisApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    [creditsApi.reducerPath]: creditsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(analysisApi.middleware)
      .concat(couponApi.middleware)
      .concat(creditsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;