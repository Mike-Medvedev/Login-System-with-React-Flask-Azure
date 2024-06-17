import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  loading: false,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementAmount: (state, actions) => {
      state.value += actions.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(incrementAsync.pending, () => console.log('incrementAsync.pending'));
    builder.addCase(incrementAsync.fulfilled, (state, action) => {
      state.value += action.payload;
    });
  },
});

export const incrementAsync = createAsyncThunk('counter/incrementAsync', async amount => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return amount;
});

export const { increment, decrement, incrementAmount } = counterSlice.actions;

export default counterSlice.reducer;
