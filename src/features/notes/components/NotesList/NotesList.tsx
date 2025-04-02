import { useAppSelector } from '../../../../app/hooks';
import { selectVisibleNotes } from '../../notesSelectors';
import NotesCard from '../NoteCard/NoteCard';
import styles from './NotesList.module.scss';

const NotesList = () => {
    const notes = useAppSelector(selectVisibleNotes);

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
                return <NotesCard key={note.id} {...note} />;
            })}
        </div>
    );
};

export default NotesList;
