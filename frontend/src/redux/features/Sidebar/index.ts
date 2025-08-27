import { createSlice } from "@reduxjs/toolkit";
import * as LucideIcons from "lucide-react";

interface MenuItems {
    path: string;
    icon: keyof typeof LucideIcons;
    label: string;
    category: string;
}

const menuItems: MenuItems[] = [
    { path: '/mis_notas', icon: "Home", label: 'Inicio', category: 'all' },
    { path: '/favorites', icon: "Star", label: 'Favoritas', category: 'favorites' },
    { path: '/archived', icon: "Archive", label: 'Archivadas', category: 'archived' },
    { path: '/settings', icon: "Settings", label: 'Configuración', category: 'settings' }
];

const categories = [
    { value: 'personal', label: 'Personal', color: 'bg-blue-500' },
    { value: 'trabajo', label: 'Trabajo', color: 'bg-green-500' },
    { value: 'ideas', label: 'Ideas', color: 'bg-purple-500' },
    { value: 'recordatorios', label: 'Recordatorios', color: 'bg-orange-500' }
];

const initialState = {
    menu: menuItems,
    categorias: categories,
    show: false
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        loadMenu: (state, action) => {
            state.menu = action.payload.menu;
            state.categorias = action.payload.categorias;
        },
        setShow: (state) => {
            state.show = !state.show
        }
    },
})

export const {
    loadMenu, setShow
} = sidebarSlice.actions
export default sidebarSlice.reducer