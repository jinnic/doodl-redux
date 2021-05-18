import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false
  },
  reducers: {
    setModalFalse: (state) => {
      state.show = false
    },
    setModalTrue: (state) => {
      state.show = true
    },
  }
})

export const { setModalFalse, setModalTrue } = modalSlice.actions;
export default modalSlice.reducer;