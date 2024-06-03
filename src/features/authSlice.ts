import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: 'auth slice',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
});

export default authSlice.reducer;
