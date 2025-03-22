import { createSlice } from '@reduxjs/toolkit'
export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        currentTab: null,
        selectedComponent: null,
    },
    reducers: {
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload;
        }
    },
});

export const { setCurrentTab } = uiSlice.actions;
export default uiSlice.reducer;