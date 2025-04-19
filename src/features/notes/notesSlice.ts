import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Note, SectionFilter, CategoryFilter, Tag, Mode } from './types';
import { filterVisibleNotes } from './utils';
import { notesData } from './notesData';
import { BASE_TAGS } from './constants';

interface NotesState {
    notes: Note[];
    visibleNotes: Note[];
    trash: Note[];
    sectionFilter: SectionFilter;
    categoryFilter: string[];
    baseTags: Tag[];
    customTags: Tag[];
    mode: Mode;
    editingNoteId: string | null;
    searchQuery: string | null;
}
export const initialState: NotesState = {
    notes: notesData,
    visibleNotes: [],
    sectionFilter: 'all',
    categoryFilter: [],
    baseTags: [...BASE_TAGS],
    customTags: [],
    trash: [],
    mode: 'view',
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
        addCustomTag: (state, action: PayloadAction<{ name: string; color: string }>) => {
            const newTag = action.payload;
            const allTags = [...state.baseTags, ...state.customTags];

            const alreadyExists = allTags.some((tag) => tag.name === newTag.name);

            if (!alreadyExists) {
                state.customTags.push(newTag);
            }
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
        setMode: (state, action: PayloadAction<'view' | 'add' | 'edit'>) => {
            state.mode = action.payload;
            if (action.payload !== 'edit') state.editingNoteId = null;
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            const index = state.notes.findIndex((note) => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
            updateVisible(state);
        },
        startEditNote: (state, action: PayloadAction<string>) => {
            state.mode = 'edit';
            state.editingNoteId = action.payload;
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
    addCustomTag,
    moveToTrash,
    deleteNote,
    startEditNote,
    updateNote,
    setSearchQuery,
    resetCategoryFilters,
    setMode,
} = notesSlice.actions;

export default notesSlice.reducer;
