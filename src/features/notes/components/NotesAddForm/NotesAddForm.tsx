import { useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import styles from './NotesAddForm.module.scss';
import { CategoryFilter, Note } from '../../types';
import { addNote, toggleAddNoteMode } from '../../notesSlice';

const NotesAddForm = () => {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<Note>({
        id: '',
        heading: '',
        text: '',
        category: 'other',
    });

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

        const newNote: Note = {
            id: Date.now().toString(),
            heading: form.heading,
            text: form.text,
            category: form.category as CategoryFilter,
            isFavorite: false,
        };
        dispatch(addNote(newNote));
        dispatch(toggleAddNoteMode(false));
    };

    return (
        <div className={styles.addForm}>
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
                        onClick={() => dispatch(toggleAddNoteMode(false))}
                        className={styles.cancelButton}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NotesAddForm;
