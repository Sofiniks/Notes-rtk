import { Note, SectionFilter } from './types';

export const filterVisibleNotes = (
    notes: Note[],
    trash: Note[],
    sectionFilter: SectionFilter,
    categoryFilter: string[],
    searchQuery: string | null,
): Note[] => {
    const isTrash = sectionFilter === 'trash';
    const isFavorites = sectionFilter === 'favorites';

    const query = searchQuery?.toLowerCase() || '';

    return (isTrash ? trash : notes)
        .filter((note) => !isFavorites || note.isFavorite)
        .filter((note) =>
            categoryFilter.length === 0
                ? true
                : categoryFilter.some((filter) => note.category?.includes(filter)),
        )
        .filter((note) =>
            query === ''
                ? true
                : note.heading.toLowerCase().includes(query) ||
                  note.text.toLowerCase().includes(query),
        );
};

export const getStripeBackground = (colors: string[]) => {
    if (!colors.length) return '#ccc';
    const step = 100 / colors.length;
    const colorStops = colors.flatMap((color, i) => {
        const from = step * i;
        const to = step * (i + 1);
        return [`${color} ${from}%`, `${color} ${to}%`];
    });
    return `linear-gradient(to bottom, ${colorStops.join(', ')})`;
};
