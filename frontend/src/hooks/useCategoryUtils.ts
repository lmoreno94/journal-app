import { useMemo } from "react";
import type { Category } from "../components/interfaces/Category";

type ColorClasses = {
    bg: string;
    text: string;
    border: string;
};

export const useCategoryUtils = (categories: Category[], noteId?: string) => {
    const colorMap: Record<string, ColorClasses> = useMemo(
        () => ({
            blue: {
                bg: "bg-blue-100 dark:bg-blue-900",
                text: "text-blue-800 dark:text-blue-200",
                border: "border-blue-200 dark:border-blue-700",
            },
            green: {
                bg: "bg-green-100 dark:bg-green-900",
                text: "text-green-800 dark:text-green-200",
                border: "border-green-200 dark:border-green-700",
            },
            purple: {
                bg: "bg-purple-100 dark:bg-purple-900",
                text: "text-purple-800 dark:text-purple-200",
                border: "border-purple-200 dark:border-purple-700",
            },
            orange: {
                bg: "bg-orange-100 dark:bg-orange-900",
                text: "text-orange-800 dark:text-orange-200",
                border: "border-orange-200 dark:border-orange-700",
            },
            red: {
                bg: "bg-red-100 dark:bg-red-900",
                text: "text-red-800 dark:text-red-200",
                border: "border-red-200 dark:border-red-700",
            },
            pink: {
                bg: "bg-pink-100 dark:bg-pink-900",
                text: "text-pink-800 dark:text-pink-200",
                border: "border-pink-200 dark:border-pink-700",
            },
            yellow: {
                bg: "bg-yellow-100 dark:bg-yellow-900",
                text: "text-yellow-800 dark:text-yellow-200",
                border: "border-yellow-200 dark:border-yellow-700",
            },
            indigo: {
                bg: "bg-indigo-100 dark:bg-indigo-900",
                text: "text-indigo-800 dark:text-indigo-200",
                border: "border-indigo-200 dark:border-indigo-700",
            },
            teal: {
                bg: "bg-teal-100 dark:bg-teal-900",
                text: "text-teal-800 dark:text-teal-200",
                border: "border-teal-200 dark:border-teal-700",
            },
            cyan: {
                bg: "bg-cyan-100 dark:bg-cyan-900",
                text: "text-cyan-800 dark:text-cyan-200",
                border: "border-cyan-200 dark:border-cyan-700",
            },
            gray: {
                bg: "bg-gray-100 dark:bg-gray-700",
                text: "text-gray-800 dark:text-gray-200",
                border: "border-gray-200 dark:border-gray-600",
            },
        }),
        []
    );

    const getCategoryInfo = (categoryId: string) => {
        const category = categories.find((cat) => cat.value === categoryId);
        return category || { label: categoryId, color: "gray" };
    };

    const getColorClasses = (colorName: string): ColorClasses => {
        return colorMap[colorName] || colorMap.gray;
    };

    const getRandomHeight = () => {
        const heights = ["h-48", "h-52", "h-56", "h-60", "h-64"];
        if (!noteId) return heights[0];
        const index = parseInt(noteId) % heights.length;
        return heights[index];
    };

    return {
        getCategoryInfo,
        getColorClasses,
        getRandomHeight,
    };
};
