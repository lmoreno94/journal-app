import { createSlice } from "@reduxjs/toolkit";
import type { Note } from "../../../components/interfaces/Note";

const notes: Note[] = [
    {
        id: "1",
        title: "Bienvenido a tu Dashboard",
        content:
            "Esta es tu primera nota. Puedes editarla, eliminarla o crear nuevas notas. Usa el menú lateral para navegar entre diferentes secciones.",
        category: "personal",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFavorite: false,
        isArchived: false,
    },
    {
        id: "2",
        title: "Ideas para el proyecto",
        content:
            "Implementar sistema de etiquetas, agregar búsqueda avanzada, crear modo oscuro.",
        category: "trabajo",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        isFavorite: true,
        isArchived: false,
    }
];

const initialState = {
    notes
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