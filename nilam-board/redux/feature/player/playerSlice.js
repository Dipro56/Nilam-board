import { baseUrl } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchCount } from './counterAPI';
import axios from "axios";

// const initialState = {
//   value: 0,
//   status: 'idle',
// };

const initialState = {
  playerList: [],
  status: "idle",
  error: null,
};

export const getPlayerList = createAsyncThunk(
  "player/getPlayerList",
  async () => {
    try {
      const URL = `${baseUrl}/player/get-all-player`;
      const response = await axios.get(URL);
      console.log("response: ", response);
      return [...response?.data?.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.value += action.payload;
//       });
//   },
// });

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPlayerList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPlayerList.fulfilled, (state, action) => {
        console.log("action: ", action);
        console.log("extra reducer action.payload", action.payload);
        state.status = "succeeded";
        state.playerList = action.payload;
      })

      .addCase(getPlayerList?.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { increment, decrement, incrementByAmount } = playerSlice.actions;

export const selectCount = (state) => state.counter.value;

export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export const getAllPlayers = (state) => state.player.playerList;
export const getPlayerListLoadingStatus = (state) => state.player.status;

export default playerSlice.reducer;
