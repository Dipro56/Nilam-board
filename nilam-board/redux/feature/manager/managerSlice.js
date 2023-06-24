import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  managerList: [],
  status: 'idle',
  error: null,
};

export const getManagerList = createAsyncThunk(
  'manager/getManagerList',
  async () => {
    try {
      const URL = `http://localhost:5000/api/v1/manager/get-all-manager`;
      const response = await axios.get(URL);
      console.log('response: ', response);
      return [...response?.data?.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getManagerList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getManagerList.fulfilled, (state, action) => {
        console.log('action: ', action);
        console.log('extra reducer action.payload', action.payload);
        state.status = 'succeeded';
        state.managerList = action.payload;
      })

      .addCase(getManagerList?.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {} = managerSlice.actions;
export const getAllManager = (state) => state.manager.managerList;
export const getManagerListLoadingStatus = (state) => state.manager.status;

export default managerSlice.reducer;
