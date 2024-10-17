import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { Auth, UserState } from '../types';

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
    loginUser: (state, action: PayloadAction<Auth>) => {
      const user = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
      toast.success('Вхід успішний');
    },
    logoutUser: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      toast.success('Вихід успішний');
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
