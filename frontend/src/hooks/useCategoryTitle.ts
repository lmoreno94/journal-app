// useCategoryTitle.ts
import { useLocation } from "react-router-dom";

export const useCategoryTitle = () => {
    const location = useLocation();

    console.log('[ MSG ]', location)

    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "";

    const getCategoryTitle = (selectedCategory?: string): string => {
        switch (selectedCategory) {
            case "favorites":
                return "Notas Favoritas";
            case "archived":
                return "Notas Archivadas";
            case "personal":
                return "Notas Personales";
            case "trabajo":
                return "Notas de Trabajo";
            case "ideas":
                return "Ideas";
            case "recordatorios":
                return "Recordatorios";
            default:
                return "Todas las Notas";
        }
    };

    return getCategoryTitle(lastSegment);
};
