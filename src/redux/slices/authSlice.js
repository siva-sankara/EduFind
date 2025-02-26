// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: null,
  user: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      AsyncStorage.setItem('token', action.payload.token);  // Store token in local storage
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      AsyncStorage.removeItem('token');  // Clear token from local storage
    },
    setUserId:(state , action)=>{
      state.userId = action.payload;
    }
  },
});

export const { setCredentials, logout , setUserId } = authSlice.actions;
export default authSlice.reducer;
