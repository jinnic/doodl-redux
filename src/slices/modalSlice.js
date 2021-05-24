import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    canvasShow: false,
    profileFormShow: false
  },
  reducers: {
    setCanvasFalse: (state) => {
      state.canvasShow = false
    },
    setCanvasTrue: (state) => {
      state.canvasShow = true
    },
    setProfileFormFalse: (state) => {
      state.profileFormShow = false
    },
    setProfileFormTrue: (state) => {
      state.profileFormShow = true
    },
  }
})

export const { setCanvasFalse, setCanvasTrue, setProfileFormFalse, setProfileFormTrue } = modalSlice.actions;
export default modalSlice.reducer;