import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    notes: [],
};

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        loadNotes: (state, action) => {
            state.notes = action.payload.notes;
        },
    },
})

export const {
    loadNotes
} = noteSlice.actions
export default noteSlice.reducer