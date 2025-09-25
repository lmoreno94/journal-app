import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Note, NoteEdit } from "../../../components/interfaces/Note";
import { v4 as uuid } from 'uuid'

const notes: Note[] = [
    {
        id: uuid(),
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
        id: uuid(),
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
    notes,
    new_note: true,
    edit_note: false,
    loading: false,
};

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        loadNotes: (state, action) => {
            state.notes = action.payload.notes;
        },
        setNewNote: (state) => {
            state.new_note = true;
            state.edit_note = false;
        },
        setEditNote: (state) => {
            state.edit_note = true;
            state.new_note = false;
        },
        addNote: (state, action) => {
            const newNote: Note = {
                id: uuid(),
                title: action.payload.title,
                content: action.payload.content,
                category: action.payload.category,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isFavorite: false,
                isArchived: false,
            };
            state.notes.push(newNote);
        },
        updateNote: (state, action: PayloadAction<NoteEdit>) => {
            const note = state.notes.find((n) => n.id === action.payload.id);
            if (note) {
                note.title = action.payload.title;
                note.content = action.payload.content;
                note.category = action.payload.category;
                note.updatedAt = new Date().toISOString();
            }
        },
        deleteNote: (state, action: PayloadAction<{ id: string }>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload.id);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        toggleFavorite: (state, action: PayloadAction<{ id: string }>) => {
            const note = state.notes.find((n) => n.id === action.payload.id);
            if (note) {
                note.isFavorite = !note.isFavorite;
            }
        },
        toggleArchived: (state, action: PayloadAction<{ id: string }>) => {
            const note = state.notes.find((n) => n.id === action.payload.id);
            if (note) {
                note.isArchived = !note.isArchived;
            }
        },
    },
})

export const {
    loadNotes, setEditNote, setNewNote, 
    addNote, updateNote, deleteNote, setLoading, toggleArchived, toggleFavorite
} = noteSlice.actions
export default noteSlice.reducer