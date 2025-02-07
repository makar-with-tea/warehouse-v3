import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './slices/productListSlice'
import categoryReducer from './slices/categorySlice'

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    categories: categoryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store