import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { Category } from '../../types/types';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axiosInstance.get<Category[]>('/categories');
  return response.data;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (newCategory: Category) => {
  newCategory.id = Date.now();
  const response = await axiosInstance.post<Category>('/categories', newCategory);
  return response.data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (updatedCategory: Category) => {
  const response = await axiosInstance.put<Category>(`/categories/${updatedCategory.id}`, updatedCategory);
  return response.data;
});

export const removeCategory = createAsyncThunk('categories/removeCategory', async (id: number) => {
  await axiosInstance.delete(`/categories/${id}`);
  return id;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load categories';
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        const index = state.categories.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(removeCategory.fulfilled, (state, action: PayloadAction<number>) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;