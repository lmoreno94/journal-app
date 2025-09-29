import type { ThemeColors } from "../components/interfaces/Theme";

export const dark: ThemeColors = {
    textColor: 'rgba(249, 250, 251, 1)',
    backgroundColor: 'rgba(17, 24, 39, 1)',
    header: {
        backgroundColor: 'rgba(55, 65, 81, 1)',
        textColor: 'rgba(249, 250, 251, 1)',
        borderColor: 'rgba(55, 65, 81, 1)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    sidebar: {
        backgroundColor: 'rgba(55, 65, 81, 1)',
        borderColor: 'rgba(55, 65, 81, 1)',
        headerBorder: 'rgba(55, 65, 81, 1)',
        titleColor: 'rgba(249, 250, 251, 1)',
    },
    closeButton: {
        hover: 'rgba(55, 65, 81, 1)',
    },
    menu: {
        activeColor: 'rgba(37, 99, 235, 1)',
        activeBackground: 'rgba(219, 234, 254, 1)',
        textColor: 'rgba(209, 213, 219, 1)',
        hoverBackground: 'rgba(55, 65, 81, 1)',
    },
    categories: {
        titleColor: 'rgba(156, 163, 175, 1)',
        labelColor: 'rgba(209, 213, 219, 1)',
        countColor: 'rgba(156, 163, 175, 1)',
    },
    toggleTheme: {
        borderTop: 'rgba(55, 65, 81, 1)',
        titleColor: 'rgba(156, 163, 175, 1)',
    },
    button: {
        background: 'rgba(37, 99, 235, 1)',
        backgroundHover: 'rgba(29, 78, 216, 1)',
        textColor: 'rgba(255, 255, 255, 1)',
        hover: 'rgba(55, 65, 81, 1)',
    },
    search: {
        border: 'rgba(75, 85, 99, 1)',
        background: 'rgba(55, 65, 81, 1)',
        textColor: 'rgba(249, 250, 251, 1)',
        focusShadow: 'rgba(59, 130, 246, 1)',
        icon: 'rgba(156, 163, 175, 1)',
    },
};