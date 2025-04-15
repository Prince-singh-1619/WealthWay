import { createSlice } from '@reduxjs/toolkit'

const navSlice = createSlice({
    name:"navData",
    initialState :{
        showSidebar: true,
    },
    reducers: {
        setShowSidebar: (state, action) =>{
            state.showSidebar = action.payload;
        },
        toggleSidebar: (state) =>{
            state.showSidebar = !state.showSidebar;
        },
    },
});

export const {setShowSidebar, toggleSidebar} = navSlice.actions;
export default navSlice.reducer;