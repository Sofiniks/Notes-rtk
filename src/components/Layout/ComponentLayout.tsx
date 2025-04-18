import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    updateVisibleNotes,
    setMode,
    toggleCategoryFilter,
    addNote,
    updateNote,
    addCustomTag,
} from '../../features/notes/notesSlice';
import {
    selectedCategoryFilter,
    selectMode,
    selectEditingNoteId,
    selectNoteById,
    selectAllTags,
} from '../../features/notes/notesSelectors';
import styles from './ComponentLayout.module.scss';
import NoteForm from '../../features/notes/components/NoteForm/NoteForm';
import Tagbar from '../../features/notes/components/Tagbar/Tagbar';
import Sidebar from '../Sidebar/Sidebar';
import AddTagModal from '../../features/notes/components/AddTagModal/AddTagModal';
import NotesList from '../../features/notes/components/NotesList/NotesList';
import IconButton from '../ui/IconButton/IconButton';
import { CategoryFilter, Note } from '../../features/notes/types';

const ComponentLayout = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(selectMode);
    const editingId = useAppSelector(selectEditingNoteId);
    const editingNote = useAppSelector(selectNoteById(editingId || ''));
    const selectedTags = useAppSelector(selectedCategoryFilter);
    const allTags = useAppSelector(selectAllTags);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(updateVisibleNotes());
    }, [dispatch]);

    const handleAddCustomTag = (tagName: string) => {
        dispatch(addCustomTag(tagName));
        setModalOpen(false);
    };

    const handleTagClick = (tag: CategoryFilter) => {
        dispatch(setMode('view'));
        dispatch(toggleCategoryFilter(tag));
    };

    const handleCancel = () => dispatch(setMode('view'));

    const handleAdd = (note: Note) => {
        dispatch(addNote(note));
        handleCancel();
    };

    const handleEdit = (note: Note) => {
        dispatch(updateNote(note));
        handleCancel();
    };

    const renderMainContent = () => {
        if (mode === 'add') {
            return <NoteForm mode="add" onSubmit={handleAdd} onCancel={handleCancel} />;
        }
        if (mode === 'edit' && editingNote) {
            return (
                <NoteForm
                    mode="edit"
                    initialData={editingNote}
                    onSubmit={handleEdit}
                    onCancel={handleCancel}
                />
            );
        }
        return <NotesList />;
    };

    return (
        <div className="container">
            <div className={styles.layout}>
                <Sidebar />
                <div className={styles.mainContent}>
                    <div className={styles.topBar}>
                        <IconButton
                            iconName="plus"
                            ariaLabel="Create note"
                            onClick={() => dispatch(setMode('add'))}
                        />
                        <Tagbar
                            tags={allTags}
                            selectedTags={selectedTags}
                            onTagClick={handleTagClick}
                        />
                        <button onClick={() => setModalOpen(true)} className={styles.addTagButton}>
                            add category
                        </button>
                    </div>
                    {renderMainContent()}
                </div>
                <AddTagModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleAddCustomTag}
                />
            </div>
        </div>
    );
};

export default ComponentLayout;
