import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn : false,
    user : null,   //userId, email, profilePic, etc
    token : null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action){
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state){
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },
    },
})

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;