import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './slices/productListSlice';
import categoryReducer from './slices/categorySlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    productList: productListReducer,
    categories: categoryReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;