import { createSlice } from "@reduxjs/toolkit";
import type { Category } from "../../../components/interfaces/Category";

const categories: Category[] = [
    { value: 'personal', label: 'Personal', bgColor: 'rgba(59,130,246,1)', color: 'blue', active: true },
    { value: 'trabajo', label: 'Trabajo', bgColor: 'rgba(34,197,94,1)', color: 'green', active: true },
    { value: 'ideas', label: 'Ideas', bgColor: 'rgba(168,85,247,1)', color: 'purple', active: true },
    { value: 'recordatorios', label: 'Recordatorios', bgColor: 'rgba(249,115,22,1)', color: 'orange', active: true }
    
];

const initialState = {
    categories: categories,
};

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        getAllCategories: (state, action) => {
            console.log('[ Categories Slice ]', )
        },
        getOneCategorie: (state) => {
            console.log('[ Categories Slice ]', )
        },
        createCategory: (state) => {
            console.log('[ Categories Slice ]', )
        },
        updateCategory: (state) => {
            console.log('[ Categories Slice ]', )
        },
        deleteCategory: (state) => {
            console.log('[ Categories Slice ]', )
        }
    },
})

export const {
    getAllCategories, getOneCategorie, createCategory, updateCategory, deleteCategory
} = categorySlice.actions
export default categorySlice.reducer