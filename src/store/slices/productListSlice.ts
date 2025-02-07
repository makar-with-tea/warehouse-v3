import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/types';
import products from '../../data/exampleProducts.json';

const initialState: Product[] = products;

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      return state.filter(product => product.id !== action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const productIndex = state.findIndex(product => product.id === action.payload.id);
      if (productIndex != -1) state[productIndex] = action.payload;
    }
  },
});

export const { addProduct, removeProduct, updateProduct } = productListSlice.actions;
export default productListSlice.reducer;