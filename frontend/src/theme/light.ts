import type { ThemeColors } from "../components/interfaces/Theme";

export const light: ThemeColors = {
    textColor: 'rgba(17, 24, 39, 1)',
    backgroundColor: 'rgba(249, 250, 251, 1)',
    header: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        textColor: 'rgba(17, 24, 39, 1)',
        borderColor: 'rgba(229, 231, 235, 1)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    sidebar: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'rgba(229, 231, 235, 1)',
        headerBorder: 'rgba(229, 231, 235, 1)',
        titleColor: 'rgba(31, 41, 55, 1)',
    },
    closeButton: {
        hover: 'rgba(243, 244, 246, 1)',
    },
    menu: {
        activeColor: 'rgba(37, 99, 235, 1)',
        activeBackground: 'rgba(219, 234, 254, 1)',
        textColor: 'rgba(75, 85, 99, 1)',
        hoverBackground: 'rgba(243, 244, 246, 1)',
    },
    categories: {
        titleColor: 'rgba(107, 114, 128, 1)',
        labelColor: 'rgba(75, 85, 99, 1)',
        countColor: 'rgba(156, 163, 175, 1)',
    },
    toggleTheme: {
        borderTop: 'rgba(229, 231, 235, 1)',
        titleColor: 'rgba(107, 114, 128, 1)',
    },
    button: {
        background: 'rgba(37, 99, 235, 1)',
        backgroundHover: 'rgba(29, 78, 216, 1)',
        textColor: 'rgba(255, 255, 255, 1)',
        hover: 'rgba(243, 244, 246, 1)',
    },
    search: {
        border: 'rgba(209, 213, 219, 1)',
        background: 'rgba(255, 255, 255, 1)',
        textColor: 'rgba(17, 24, 39, 1)',
        focusShadow: 'rgba(59, 130, 246, 1)',
        icon: 'rgba(156, 163, 175, 1)',
    },
};