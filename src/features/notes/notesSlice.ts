import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Note, SectionFilter, CategoryFilter } from './types';
import { notesData } from './notesData';

interface NotesState {
    notes: Note[];
    trash: Note[];
    sectionFilter: SectionFilter;
    categoryFilter: CategoryFilter;
    isAdding: boolean;
    isEdit: boolean;
    editingNoteId: string | null;
    searchQuery: string | null;
}
export const initialState: NotesState = {
    notes: notesData,
    sectionFilter: 'all',
    categoryFilter: 'all',
    trash: [],
    isAdding: false,
    isEdit: false,
    editingNoteId: null,
    searchQuery: '',
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const note = state.notes.find((note) => note.id === action.payload);
            if (note) {
                note.isFavorite = !note.isFavorite;
            }
        },
        setSectionFilter: (state, action: PayloadAction<SectionFilter>) => {
            state.sectionFilter = action.payload;
        },
        setCategoryFilter: (state, action: PayloadAction<CategoryFilter>) => {
            state.categoryFilter = action.payload;
        },
        moveToTrash: (state, action: PayloadAction<string>) => {
            const noteId = action.payload;
            const note = state.notes.find((note) => note.id === noteId);
            if (note) {
                state.notes = state.notes.filter((note) => note.id !== noteId);
                state.trash.push(note);
            }
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            const noteId = action.payload;
            state.trash = state.trash.filter((note) => note.id !== noteId);
        },
        toggleAddNoteMode: (state, action: PayloadAction<boolean>) => {
            state.isAdding = action.payload;
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            const index = state.notes.findIndex((note) => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
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
        },
    },
});

export const {
    addNote,
    toggleFavorite,
    setSectionFilter,
    setCategoryFilter,
    moveToTrash,
    deleteNote,
    toggleAddNoteMode,
    setEditMode,
    exitEditMode,
    updateNote,
    setSearchQuery,
} = notesSlice.actions;

export default notesSlice.reducer;
