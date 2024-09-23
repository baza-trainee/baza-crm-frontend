import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { User, UserState } from '../types';

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const initialState: UserState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
      toast.success('Увійшли успішно');
    },
    logoutUser: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      toast.success('Вийшли успішно');
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
