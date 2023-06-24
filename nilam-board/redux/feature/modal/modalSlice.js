import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  modalProps: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      console.log('open modal state', action);
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    closeModal: (state, action) => {
      state.modalType = null;
      state.modalProps = null;
    },
  },
});

export const getModal = (state) => state.modal?.modalType;
export const getModalProps = (state) => state.modal?.modalProps;

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
