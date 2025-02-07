import { createSlice } from '@reduxjs/toolkit';
import { UserProfile } from '../../types/types';


const initialState: UserProfile = {
    id: 0,
    name: 'Иван Безфамильный',
    email: 'someemail@example.com',
    group: 'Студент',
    avatarUrl: 'https://static.vecteezy.com/system/resources/previews/020/640/149/non_2x/cute-owl-boho-style-illustration-vector.jpg'
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
  });

export default userSlice.reducer;