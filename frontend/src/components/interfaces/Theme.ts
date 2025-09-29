export interface Theme {
    theme: 'light' | 'dark';
    mountedComponent: boolean;
}

interface HeaderTheme {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
}

interface SidebarTheme {
    backgroundColor: string;
    borderColor: string;
    headerBorder: string;
    titleColor: string
}

interface CloseButton {
    hover: string;
}

interface Menu {
    activeColor: string;
    activeBackground: string;
    textColor: string;
    hoverBackground: string;
}

interface Categories {
    titleColor: string;
    labelColor: string;
    countColor: string;
}

interface ToggleTheme {
    borderTop: string;
    titleColor: string;
}

interface Overlay {
    backgroundColor: string;
}

interface Button {
    background: string;
    backgroundHover: string;
    textColor: string;
    hover: string;
}

interface Search {
    border: string;
    background: string;
    textColor: string;
    focusShadow: string;
    icon: string;
}

export interface ThemeColors {
    textColor: string;
    backgroundColor: string;
    header: HeaderTheme;
    sidebar: SidebarTheme;
    closeButton: CloseButton;
    menu: Menu;
    categories: Categories;
    toggleTheme: ToggleTheme;
    overlay: Overlay;
    button: Button;
    search: Search;
}