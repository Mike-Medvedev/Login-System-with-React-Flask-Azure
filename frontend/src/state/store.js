import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import authSlice from './slices/authSlice';
import dataTableSlice from './slices/dataTableSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    dataTable: dataTableSlice,
  },
});

export default store;
