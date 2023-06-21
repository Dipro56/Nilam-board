import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../feature/player/playerSlice';
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});
