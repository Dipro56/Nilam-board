import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../feature/player/playerSlice';
import modalReducer from '../feature/modal/modalSlice';
import managerReducer from '../feature/manager/managerSlice';

// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    modal: modalReducer,
    manager: managerReducer,
  },
});
