import { setupListeners } from '@reduxjs/toolkit/query/react';
import authReducer from './slices/auth';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

setupListeners(store.dispatch);

export default store;
