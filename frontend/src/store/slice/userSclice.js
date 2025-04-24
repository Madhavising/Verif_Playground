import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {},
        isAdmin: false,
        isSuperAdmin : false
    },
    reducers: {
        setUser: (state, action) => {
            if (action.payload.user.role === 'admin') {
                state.isAdmin = true
            }
            state.userData = action.payload.user.data;
            state.loading = false
        },
        clearUser: (state) => {
            state.userData = {};
            state.isAdmin = false
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
