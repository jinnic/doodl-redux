import {createSlice} from '@reduxjs/toolkit'

/**
 * we might need add User doodle reducer.
 * also do we need to clear doodle.user state??
 */
export const doodleSlice = createSlice({
  name: 'doodle',
  initialState:{
    all: [],
    user: []
  },
  reducers:{
    setDoodles: (state, action) => {
      state.all = action.payload
    },
    setUserDoodles: (state, action) => {
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
    }
  }
})

export const { setDoodles, setUserDoodles, addDoodle, updateDoodle, deleteDoodle} = doodleSlice.actions;
export default doodleSlice.reducer;