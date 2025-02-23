import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { Product } from '../../types/types';

interface ProductListState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductListState = {
  products: [],
  loading: false,
  error: null,
};

// Асинхронные действия для CRUD операций
export const fetchProducts = createAsyncThunk('productList/fetchProducts', async () => {
  const response = await axiosInstance.get<Product[]>('/products');
  return response.data;
});

export const addProduct = createAsyncThunk('productList/addProduct', async (newProduct: Product) => {
  newProduct.id = Date.now();
  const response = await axiosInstance.post<Product>('/products', newProduct);
  return response.data;
});

export const updateProduct = createAsyncThunk('productList/updateProduct', async (updatedProduct: Product) => {
  const response = await axiosInstance.put<Product>(`/products/${updatedProduct.id}`, updatedProduct);
  return response.data;
});

export const removeProduct = createAsyncThunk('productList/removeProduct', async (id: number) => {
  await axiosInstance.delete(`/products/${id}`);
  return id;
});

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(removeProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter(product => product.id !== action.payload);
      });
  },
});

export default productListSlice.reducer;