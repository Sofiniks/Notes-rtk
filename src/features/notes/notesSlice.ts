import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Note, SectionFilter, CategoryFilter } from './types';
import { filterVisibleNotes } from './utils';
import { notesData } from './notesData';

interface NotesState {
    notes: Note[];
    visibleNotes: Note[];
    trash: Note[];
    sectionFilter: SectionFilter;
    categoryFilter: CategoryFilter[];
    isAdding: boolean;
    isEdit: boolean;
    editingNoteId: string | null;
    searchQuery: string | null;
}
export const initialState: NotesState = {
    notes: notesData,
    visibleNotes: [],
    sectionFilter: 'all',
    categoryFilter: [],
    trash: [],
    isAdding: false,
    isEdit: false,
    editingNoteId: null,
    searchQuery: '',
};

const updateVisible = (state: NotesState) => {
    state.visibleNotes = filterVisibleNotes(
        state.notes,
        state.trash,
        state.sectionFilter,
        state.categoryFilter,
        state.searchQuery,
    );
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        updateVisibleNotes: (state) => {
            updateVisible(state);
        },
        addNote: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
            updateVisible(state);
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const note = state.notes.find((note) => note.id === action.payload);
            if (note) {
                note.isFavorite = !note.isFavorite;
            }
            updateVisible(state);
        },
        setSectionFilter: (state, action: PayloadAction<SectionFilter>) => {
            state.sectionFilter = action.payload;
            updateVisible(state);
        },
        toggleCategoryFilter: (state, action: PayloadAction<CategoryFilter>) => {
            const category = action.payload;
            if (state.categoryFilter.includes(category)) {
                state.categoryFilter = state.categoryFilter.filter((cat) => cat !== category);
            } else {
                state.categoryFilter.push(category);
            }
            updateVisible(state);
        },
        moveToTrash: (state, action: PayloadAction<string>) => {
            const noteId = action.payload;
            const note = state.notes.find((note) => note.id === noteId);
            if (note) {
                state.notes = state.notes.filter((note) => note.id !== noteId);
                state.trash.push(note);
            }
            updateVisible(state);
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            const noteId = action.payload;
            state.trash = state.trash.filter((note) => note.id !== noteId);
            updateVisible(state);
        },
        toggleAddNoteMode: (state, action: PayloadAction<boolean>) => {
            state.isAdding = action.payload;
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            const index = state.notes.findIndex((note) => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
            updateVisible(state);
        },
        setEditMode: (state, action: PayloadAction<string>) => {
            state.isEdit = true;
            state.editingNoteId = action.payload;
            state.isAdding = false;
        },
        exitEditMode: (state) => {
            state.isEdit = false;
            state.editingNoteId = null;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            updateVisible(state);
        },
        resetCategoryFilters: (state) => {
            state.categoryFilter = [];
        },
    },
});

export const {
    updateVisibleNotes,
    addNote,
    toggleFavorite,
    setSectionFilter,
    toggleCategoryFilter,
    moveToTrash,
    deleteNote,
    toggleAddNoteMode,
    setEditMode,
    exitEditMode,
    updateNote,
    setSearchQuery,
    resetCategoryFilters,
} = notesSlice.actions;

export default notesSlice.reducer;
