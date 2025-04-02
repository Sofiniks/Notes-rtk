import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const selectAllNotes = (state: RootState) => state.notes.notes;

export const selectVisibleNotes = createSelector(
    [
        (state: RootState) => state.notes.notes,
        (state: RootState) => state.notes.trash,
        (state: RootState) => state.notes.sectionFilter,
        (state: RootState) => state.notes.categoryFilter,
        (state: RootState) => state.notes.searchQuery,
    ],
    (notes, trash, sectionFilter, categoryFilter, searchQuery) => {
        let visibleNotes = notes;
        if (sectionFilter === 'trash') {
            visibleNotes = trash;
        } else if (sectionFilter === 'favorites') {
            visibleNotes = visibleNotes.filter((note) => note.isFavorite);
        }

        if (categoryFilter !== 'all') {
            visibleNotes = visibleNotes.filter((note) => note.category === categoryFilter);
        }

        if (searchQuery) {
            const lowerCaseSearchQuery = searchQuery.toLowerCase();
            visibleNotes = visibleNotes.filter(
                (note) =>
                    note.heading.toLowerCase().includes(lowerCaseSearchQuery) ||
                    note.text.toLowerCase().includes(lowerCaseSearchQuery),
            );
        }

        return visibleNotes;
    },
);

export const selectEditingNoteId = (state: RootState) => state.notes.editingNoteId;
export const selectNoteById = (noteId: string) => (state: RootState) =>
    state.notes.notes.find((note) => note.id === noteId);

export const selectNotesSection = (state: RootState) => state.notes.sectionFilter;
export const selectIsAddingMode = (state: RootState) => state.notes.isAdding;
export const selectIsEditMode = (state: RootState) => state.notes.isEdit;
export const selectSearchQuery = (state: RootState) => state.notes.searchQuery;
