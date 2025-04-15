import { Note, SectionFilter, CategoryFilter } from './types';

export const filterVisibleNotes = (
    notes: Note[],
    trash: Note[],
    sectionFilter: SectionFilter,
    categoryFilter: CategoryFilter[],
    searchQuery: string | null,
): Note[] => {
    const isTrash = sectionFilter === 'trash';
    const isFavorites = sectionFilter === 'favorites';

    let base = isTrash ? trash : notes;

    if (isFavorites && !isTrash) {
        base = base.filter((note) => note.isFavorite);
    }

    if (categoryFilter.length > 0) {
        base = base.filter((note) =>
            categoryFilter.some((filter) => note.category?.includes(filter)),
        );
    }

    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        base = base.filter(
            (note) =>
                note.heading.toLowerCase().includes(query) ||
                note.text.toLowerCase().includes(query),
        );
    }

    return base;
};

export const getColor = (category: string) => {
    switch (category) {
        case 'shopping':
            return '#cc85ff';
        case 'business':
            return '#facd39';
        case 'other':
            return '#0ad4ef';
        default:
            return '#ccc';
    }
};

export const getStripeBackground = (categories: string[]) => {
    if (!Array.isArray(categories) || categories.length === 0) {
        return '#ccc';
    }

    const step = 100 / categories.length;
    const colorStops = categories.map((cat, index) => {
        const color = getColor(cat);
        const from = step * index;
        const to = step * (index + 1);
        return [`${color} ${from}%`, `${color} ${to}%`];
    });

    return `linear-gradient(to bottom, ${colorStops.join(', ')})`;
};
