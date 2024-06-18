import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { validateTokenAsync } from '../thunks/validateTokenAsync';

const initialState = {
  isValidatingToken: false,
  isAuth: false,
  isValidToken: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.isAuth = true;
    },
    logout: state => {
      state.isAuth = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(validateTokenAsync.pending, state => {
        state.isValidatingToken = true;
      })
      .addCase(validateTokenAsync.fulfilled, state => {
        state.isValidatingToken = false;
        state.isValidToken = true;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(validateTokenAsync.rejected, (state, action) => {
        state.isValidatingToken = false;
        state.isValidToken = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
