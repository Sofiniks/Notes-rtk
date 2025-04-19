import { useState } from 'react';
import styles from './AddTagModal.module.scss';

type AddTagModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (tagName: string, tagColor: string) => void;
};

const COLORS = [
    '#9b59b6',
    '#60c1ff',
    '#ffaa64',
    '#ff7676',
    '#74df90',
    '#ffe073',
    '#a390ff',
    '#ffa9d4',
];

const AddTagModal = ({ isOpen, onClose, onSubmit }: AddTagModalProps) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        onSubmit(inputValue.trim().toLowerCase(), selectedColor);
        setInputValue('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3 className={styles.title}>Add name & chose color</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter tag's name"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={styles.input}
                    />

                    <div className={styles.colors}>
                        {COLORS.map((color) => (
                            <div
                                key={color}
                                className={`${styles.colorCircle} ${selectedColor === color ? styles.selected : ''}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="button" onClick={onClose} className={styles.cancel}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.submit}>
                            Create tag
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTagModal;
