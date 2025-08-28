// useCategoryTitle.ts
import { useParams } from "react-router-dom";

export const useCategoryTitle = () => {
    const { category } = useParams<{ category?: string }>();

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

    return getCategoryTitle(category);
};
