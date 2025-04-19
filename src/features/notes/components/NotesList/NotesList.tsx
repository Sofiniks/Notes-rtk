import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { selectVisibleNotes, selectAllTags, selectNotesSection } from '../../notesSelectors';
import { moveToTrash, deleteNote, toggleFavorite, startEditNote } from '../../notesSlice';
import NotesCard from '../NoteCard/NoteCard';
import styles from './NotesList.module.scss';
import { SECTION_FILTERS } from '../../constants';

const NotesList = () => {
    const dispatch = useAppDispatch();
    const notes = useAppSelector(selectVisibleNotes);
    const allTags = useAppSelector(selectAllTags);
    const currentSection = useAppSelector(selectNotesSection);

    if (!notes || notes.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>No notes to view in this section</p>
            </div>
        );
    }

    return (
        <div className={styles.notesList}>
            {notes.map((note) => {
                const tagColors =
                    note.category?.map((catName) => {
                        return allTags.find((tag) => tag.name === catName)?.color || '#ccc';
                    }) || [];

                return (
                    <NotesCard
                        key={note.id}
                        id={note.id}
                        heading={note.heading}
                        text={note.text}
                        isFavorite={note.isFavorite}
                        tagColors={tagColors}
                        onClick={() => dispatch(startEditNote(note.id))}
                        onToggleFavorite={(e) => {
                            e.stopPropagation();
                            dispatch(toggleFavorite(note.id));
                        }}
                        onDelete={(e) => {
                            e.stopPropagation();
                            if (currentSection === SECTION_FILTERS.TRASH) {
                                dispatch(deleteNote(note.id));
                            } else {
                                dispatch(moveToTrash(note.id));
                            }
                        }}
                    />
                );
            })}
        </div>
    );
};

export default NotesList;
