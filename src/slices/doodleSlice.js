import {createSlice} from '@reduxjs/toolkit'

/**
 * we might need add User doodle reducer.
 * also do we need to clear doodle.user state??
 */
export const doodleSlice = createSlice({
  name: 'doodle',
  initialState:{
    all: [],
    user: [],
    page: 1,
    totalPages: 1 
  },
  reducers:{
    setDoodles: (state, action) => {
      state.all = action.payload.doodles
      state.totalPages = action.payload.total_pages
    },
    setUserDoodles: (state, action) => {
      //might need to use spread adding new payload to current state
      state.user = action.payload
    },
    addDoodle: (state, action) => {
      //action.payload.location === "home" => add to doodle.all
      state.user = [action.payload, ...state.user]
    },
    updateDoodle: (state, action) => {
      const updatedDoods = state.user.map((doodle) => {
        if (doodle.id === action.payload.id) {
          return action.payload;
        } else {
          return doodle;
        }
      });
      state.user = updatedDoods
    },
    deleteDoodle: (state, action) =>{
      const updatedDoods = state.user.filter(doodle => doodle.id !== action.payload)
      state.user = updatedDoods
    },
    resetPage: (state) => {
      state.page = 1;
    },
    updatePage: (state, action) => {
      state.page += action.payload
      console.log(state.page)
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload
    }
  }
})

export const { setDoodles, setUserDoodles, addDoodle, updateDoodle, deleteDoodle, resetPage, updatePage, setTotalPage } = doodleSlice.actions;
export default doodleSlice.reducer;