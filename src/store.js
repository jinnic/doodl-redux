import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import doodleReducer from './slices/doodleSlice';


export default configureStore({
  reducer: {
      user: userReducer,
      doodle: doodleReducer
  },
})