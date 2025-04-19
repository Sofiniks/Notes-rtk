import { useAppSelector } from '../../../../app/hooks';
import { selectVisibleNotes, selectAllTags } from '../../notesSelectors';
import NotesCard from '../NoteCard/NoteCard';
import styles from './NotesList.module.scss';

const NotesList = () => {
    const notes = useAppSelector(selectVisibleNotes);
    const allTags = useAppSelector(selectAllTags);

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
                const tagColors = note.category?.map((catName) => {
                    return allTags.find((tag) => tag.name === catName)?.color || '#ccc';
                });
                return <NotesCard key={note.id} {...note} tagColors={tagColors || []} />;
            })}
        </div>
    );
};

export default NotesList;
