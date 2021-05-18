import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import doodleReducer from './slices/doodleSlice';
import loadingReducer from './slices/loadingSlice';
import modalReducer from './slices/modalSlice'

export default configureStore({
  reducer: {
      user: userReducer,
      doodle: doodleReducer,
      loading: loadingReducer,
      modal: modalReducer
  },
})