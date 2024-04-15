import { setupListeners } from '@reduxjs/toolkit/query/react';
import { errorLogger } from './middlewares/errorLogger';
import { apiLoader } from './middlewares/apiLoader';
import authReducer from './slices/auth';
import { configureStore } from '@reduxjs/toolkit';

const middleware = [errorLogger, apiLoader];

const store = configureStore({
  reducer: {
    auth: authReducer,
    // [restApi.reducerPath]: restApi.reducer,
  },
  middleware: (geDefaultMiddleware) =>
    geDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

setupListeners(store.dispatch);

export default store;
