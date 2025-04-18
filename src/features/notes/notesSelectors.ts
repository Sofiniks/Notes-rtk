import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const selectAllNotes = (state: RootState) => state.notes.notes;
export const selectVisibleNotes = (state: RootState) => state.notes.visibleNotes;
export const selectEditingNoteId = (state: RootState) => state.notes.editingNoteId;
export const selectNoteById = (noteId: string) => (state: RootState) =>
    state.notes.notes.find((note) => note.id === noteId);
export const selectNotesSection = (state: RootState) => state.notes.sectionFilter;
export const selectMode = (state: RootState) => state.notes.mode;
export const selectSearchQuery = (state: RootState) => state.notes.searchQuery;
export const selectedCategoryFilter = (state: RootState) => state.notes.categoryFilter;
export const selectBaseTags = (state: RootState) => state.notes.baseTags;
export const selectCustomTags = (state: RootState) => state.notes.customTags;

export const selectAllTags = createSelector([selectBaseTags, selectCustomTags], (base, custom) => [
    ...base,
    ...custom,
]);
