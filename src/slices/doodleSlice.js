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
    totalPages: 1,
    totalUserPages: 1,
    currentlyEditing: {},
    doodleAdded: false
  },
  reducers:{
    setDoodles: (state, action) => {
      const combinedDoodles = [...state.all, ...action.payload.doodles];
        const uniqueDoodles = Array.from(
          new Set(combinedDoodles.map((a) => a.id))
        ).map((id) => {
          return combinedDoodles.find((a) => a.id === id);
        });
      state.all = uniqueDoodles
      state.totalPages = action.payload.total_pages
    },
    setUserDoodles: (state, action) => {
      //might need to use spread adding new payload to current state
      const combinedDoodles = [...state.user, ...action.payload.doodles];
        const uniqueDoodles = Array.from(
          new Set(combinedDoodles.map((a) => a.id))
        ).map((id) => {
          return combinedDoodles.find((a) => a.id === id);
        });
      state.user = uniqueDoodles
      state.totalUserPages = action.payload.total_pages
    },
    addDoodle: (state, action) => {
      //action.payload.location === "home" => add to doodle.all
      state.user = [action.payload.doodle, ...state.user]
      state.all = [action.payload.doodle, ...state.all]
      state.totalUserPages = action.payload.total_pages
      state.doodleAdded = true
    },
    updateDoodle: (state, action) => {
      const updatedUserDoods = state.user.map((doodle) => {
        if (doodle.id === action.payload.id) {
          return action.payload;
        } else {
          return doodle;
        }
      });
      const updatedDoods = state.all.map((doodle) => {
        if (doodle.id === action.payload.id) {
          return action.payload;
        } else {
          return doodle;
        }
      });
      state.all = updatedDoods
      state.user = updatedUserDoods
    },
    deleteDoodle: (state, action) =>{
      const updatedUserDoods = state.user.filter(doodle => doodle.id !== action.payload)
      const updatedDoods = state.all.filter(doodle => doodle.id !== action.payload)
      state.user = updatedUserDoods
      state.all = updatedDoods
    },
    setEditing: (state, action) => {
      state.currentlyEditing = action.payload
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
      console.log(state.totalPage)
    }

  }
})

export const { setDoodles, setUserDoodles, addDoodle, updateDoodle, deleteDoodle, setEditing, resetPage, updatePage, setTotalPage } = doodleSlice.actions;
export default doodleSlice.reducer;