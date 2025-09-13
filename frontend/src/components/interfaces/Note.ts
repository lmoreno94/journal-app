export interface Note {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    isFavorite: boolean;
    isArchived: boolean;
}

export interface NoteFormData {
    title: string;
    content: string;
    category: string;
}