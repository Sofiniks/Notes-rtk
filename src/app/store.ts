import { configureStore } from '@reduxjs/toolkit';
import notesReducer, { initialState as notesInitialState } from '../features/notes/notesSlice';
import { loadState, saveState } from '../utils/localStorage';

const preloadedState = {
    notes: {
        ...notesInitialState,
        ...loadState(),
    },
};

export const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    saveState({
        notes: store.getState().notes.notes,
        trash: store.getState().notes.trash,
        customTags: store.getState().notes.customTags,
    });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
