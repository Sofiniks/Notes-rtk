import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import styles from './EditNoteForm.module.scss';
import { Note } from '../../types';
import { exitEditMode, updateNote } from '../../notesSlice';
import { selectEditingNoteId, selectNoteById } from '../../notesSelectors';

const NotesEditForm = () => {
    const dispatch = useAppDispatch();
    const editingNoteId = useAppSelector(selectEditingNoteId);
    let editingNote: Note | undefined;
    const [form, setForm] = useState<Note>({
        id: '',
        heading: '',
        text: '',
        category: 'other',
    });
    if (editingNoteId) {
        editingNote = useAppSelector(selectNoteById(editingNoteId));
    }

    useEffect(() => {
        if (editingNote) {
            const { id, heading, text, category } = editingNote;
            setForm({ id, heading, text, category });
        }
    }, [editingNote]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(updateNote(form));
        dispatch(exitEditMode());
    };

    return (
        <div className={styles.editForm}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="heading"
                    value={form.heading}
                    onChange={handleChange}
                    placeholder="Note's Title"
                />
                <textarea
                    name="text"
                    value={form.text}
                    onChange={handleChange}
                    placeholder="Note..."
                />
                <select name="category" value={form.category} onChange={handleChange}>
                    <option value="shopping">Shopping</option>
                    <option value="business">Business</option>
                    <option value="other">Other things</option>
                </select>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.saveButton}>
                        Save
                    </button>
                    <button
                        onClick={() => dispatch(exitEditMode())}
                        className={styles.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NotesEditForm;
