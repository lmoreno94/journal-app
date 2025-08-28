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

const initialState = {
    menu: menuItems,
    show: false
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        loadMenu: (state, action) => {
            state.menu = action.payload.menu;
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