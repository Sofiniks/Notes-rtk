export type Note = {
    id: string;
    heading: string;
    text: string;
    category?: string[];
    isFavorite?: boolean;
};

export type Mode = 'view' | 'add' | 'edit';
export type SectionFilter = 'all' | 'favorites' | 'trash';
export type Tag = {
    name: string;
    color: string;
};
export type CategoryFilter = string;
