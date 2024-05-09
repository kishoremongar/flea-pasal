import { setupListeners } from '@reduxjs/toolkit/query/react';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import cartReducer from './slices/cart';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cartItems: cartReducer,
  },
});

setupListeners(store.dispatch);

export default store;
