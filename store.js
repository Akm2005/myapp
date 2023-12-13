// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './screens/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
