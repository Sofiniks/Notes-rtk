import { useState } from 'react';
import styles from './AddTagModal.module.scss';

type AddTagModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (tagName: string) => void;
};

const AddTagModal = ({ isOpen, onClose, onSubmit }: AddTagModalProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        onSubmit(inputValue.trim());
        setInputValue('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3 className={styles.title}>Создать тег</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter name of tag"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={styles.input}
                    />
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
