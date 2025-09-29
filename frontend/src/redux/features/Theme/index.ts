import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light',
    mountedComponent: true
};

export const themeSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<{ theme: string }>) => {
            state.theme = action.payload.theme;
        },
        setMountedComponent: (state) => {
            state.mountedComponent = !state.mountedComponent
        }
    },
})

export const {
    setTheme, setMountedComponent
} = themeSlice.actions
export default themeSlice.reducer