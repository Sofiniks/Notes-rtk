import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { selectAllTags } from '../../notesSelectors';
import styles from './NoteForm.module.scss';
import { Note, CategoryFilter } from '../../types';

type NoteFormProps = {
    mode: 'add' | 'edit';
    initialData?: Note;
    onSubmit: (note: Note) => void;
    onCancel: () => void;
};

const NoteForm = ({ mode, initialData, onSubmit, onCancel }: NoteFormProps) => {
    const [form, setForm] = useState<Note>({
        id: '',
        heading: '',
        text: '',
        category: [],
        isFavorite: false,
    });
    const allTags = useAppSelector(selectAllTags);

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setForm(initialData);
        }
    }, [mode, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

        const noteToSubmit: Note = {
            ...form,
            id: mode === 'add' ? Date.now().toString() : form.id,
        };

        onSubmit(noteToSubmit);
    };

    return (
        <div className={styles.formWrapper}>
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
                    {allTags.map((item) => (
                        <div
                            key={item}
                            className={`${styles.tag} ${styles[item]} ${
                                form.category?.includes(item) ? styles.active : ''
                            }`}
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
                    <button type="button" onClick={onCancel} className={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NoteForm;
