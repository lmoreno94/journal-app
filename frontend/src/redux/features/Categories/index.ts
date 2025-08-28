import { createSlice } from "@reduxjs/toolkit";
import type { Category } from "../../../components/interfaces/Category";

const categories: Category[] = [
    { value: 'personal', label: 'Personal', bgColor: 'bg-blue-500', color: 'blue', active: true },
    { value: 'trabajo', label: 'Trabajo', bgColor: 'bg-green-500', color: 'green', active: true },
    { value: 'ideas', label: 'Ideas', bgColor: 'bg-purple-500', color: 'purple', active: true },
    { value: 'recordatorios', label: 'Recordatorios', bgColor: 'bg-orange-500', color: 'orange', active: true }
    
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