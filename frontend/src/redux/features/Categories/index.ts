import { createSlice } from "@reduxjs/toolkit";

interface Category {
    value: string;
    label: string;
    color: string;
    active: boolean;
}

const categories: Category[] = [
    { value: 'personal', label: 'Personal', color: 'bg-blue-500', active: true },
    { value: 'trabajo', label: 'Trabajo', color: 'bg-green-500', active: true },
    { value: 'ideas', label: 'Ideas', color: 'bg-purple-500', active: true },
    { value: 'recordatorios', label: 'Recordatorios', color: 'bg-orange-500', active: true }
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