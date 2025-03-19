import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';
import { UserProfile } from '../../types/types';

interface UserState extends UserProfile {
  token: string | null;
}

const initialState: UserState = {
  name: '',
  email: '',
  group: '',
  avatarUrl: '',
  token: null,
};

// Асинхронное действие для логина
export const login = createAsyncThunk<{ accessToken: string; user: UserProfile }, { email: string; password: string }>(
  'user/login',
  async (credentials) => {
    const response = await axiosInstance.post<{ accessToken: string; user: UserProfile }>('/login', credentials);
    return response.data;
  }
);

// Асинхронное действие для логаута
export const logout = createAsyncThunk('user/logout', async () => {
  await axiosInstance.post('/logout');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action: PayloadAction<{ accessToken: string; user: UserProfile }>) => {
        state.token = action.payload.accessToken;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.group = action.payload.user.group;
        state.avatarUrl = action.payload.user.avatarUrl;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.name = '';
        state.email = '';
        state.group = '';
        state.avatarUrl = '';
      });
  },
});

export default userSlice.reducer;