import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import exampleCategories from '../../data/exampleCategories.json';
import { Category } from '../../types/types';

const initialState: Category[] = exampleCategories;

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      return state.filter(category => category.id !== action.payload);
    },
  },
});

export const { addCategory, updateCategory, removeCategory } = categorySlice.actions;
export default categorySlice.reducer;