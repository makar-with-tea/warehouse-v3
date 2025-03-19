import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './slices/productListSlice';
import categoryReducer from './slices/categorySlice';
import userReducer from './slices/userSlice';
import axiosInstance from '../axiosConfig';

const store = configureStore({
  reducer: {
    productList: productListReducer,
    categories: categoryReducer,
    user: userReducer,
  },
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.user.token;
  if (token) {
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  else {
    console.log('No token found');
  }
  return config;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;