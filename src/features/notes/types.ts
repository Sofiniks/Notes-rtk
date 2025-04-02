export type Note = {
    id: string;
    heading: string;
    text: string;
    category?: string;
    isFavorite?: boolean;
};

export type SectionFilter = 'all' | 'favorites' | 'trash';
export type CategoryFilter = 'all' | 'shopping' | 'business' | 'other';
