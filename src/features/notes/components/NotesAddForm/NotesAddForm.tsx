import { useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import styles from './NotesAddForm.module.scss';
import { CategoryFilter, Note } from '../../types';
import { addNote, setMode } from '../../notesSlice';

const NotesAddForm = () => {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<Note>({
        id: '',
        heading: '',
        text: '',
        category: [],
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

        const newNote: Note = {
            id: Date.now().toString(),
            heading: form.heading,
            text: form.text,
            category: form.category as CategoryFilter[],
            isFavorite: false,
        };
        dispatch(addNote(newNote));
        dispatch(setMode('view'));
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
                <div className={styles.tagsContainer}>
                    {(['shopping', 'business', 'other'] as CategoryFilter[]).map((item) => (
                        <div
                            key={item}
                            className={`${styles.tag} ${styles[item]} ${form.category?.includes(item) ? styles.active : ''}`}
                            onClick={() => handleCategoryToggle(item)}
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

export default NotesAddForm;
