import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    status: false
  },
  reducers: {
    setLoadingFalse: (state) => {
      state.status = false
    },
    setLoadingTrue: (state) => {
      state.status = true
    },
  }
})

export const { setLoadingFalse, setLoadingTrue } = loadingSlice.actions;
export default loadingSlice.reducer;