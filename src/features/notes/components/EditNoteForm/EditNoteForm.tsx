import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import styles from './EditNoteForm.module.scss';
import { Note, CategoryFilter } from '../../types';
import { setMode, updateNote } from '../../notesSlice';
import { selectEditingNoteId, selectNoteById } from '../../notesSelectors';

const NotesEditForm = () => {
    const dispatch = useAppDispatch();
    const editingNoteId = useAppSelector(selectEditingNoteId);
    let editingNote: Note | undefined;
    const [form, setForm] = useState<Note>({
        id: '',
        heading: '',
        text: '',
        category: [],
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

    const handleCategoryToggle = (value: CategoryFilter) => {
        setForm((prev) => {
            const alreadySelected = prev.category?.includes(value);
            return {
                ...prev,
                category: alreadySelected
                    ? (prev.category || []).filter((item) => item !== value)
                    : [...(prev.category || []), value],
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(updateNote(form));
        dispatch(setMode('view'));
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
                <div className={styles.tagsContainer}>
                    {(['shopping', 'business', 'other'] as string[]).map((item) => (
                        <div
                            key={item}
                            className={`${styles.tag} ${styles[item]} ${form.category?.includes(item) ? styles.active : ''}`}
                            onClick={() => handleCategoryToggle(item as CategoryFilter)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.saveButton}>
                        Save
                    </button>
                    <button
                        onClick={() => dispatch(setMode('view'))}
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
