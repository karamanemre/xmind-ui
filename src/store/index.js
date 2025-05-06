import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import demandReducer from './slices/demandSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    demand: demandReducer
  },
}); 