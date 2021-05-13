import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: null
    },
    reducers: {
        setUser: (state, action) => {
            state.current = action.payload
        },
        clearUser: (state) => {
            state.current = null
        }

    }
})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;