import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateVisibleNotes, setMode, toggleCategoryFilter } from '../../features/notes/notesSlice';
import { selectedCategoryFilter, selectMode } from '../../features/notes/notesSelectors';
import styles from './ComponentLayout.module.scss';
import Tagbar from '../../features/notes/components/Tagbar/Tagbar';
import Sidebar from '../Sidebar/Sidebar';
import NotesList from '../../features/notes/components/NotesList/NotesList';
import NotesAddForm from '../../features/notes/components/NotesAddForm/NotesAddForm';
import NotesEditForm from '../../features/notes/components/EditNoteForm/EditNoteForm';
import IconButton from '../ui/IconButton/IconButton';
import { CategoryFilter } from '../../features/notes/types';

const ComponentLayout = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(selectMode);
    const selectedTags = useAppSelector(selectedCategoryFilter);
    const tags = ['shopping', 'business', 'other'];

    useEffect(() => {
        dispatch(updateVisibleNotes());
    }, [dispatch]);

    const handleTagClick = (tag: CategoryFilter) => {
        dispatch(setMode('view'));
        dispatch(toggleCategoryFilter(tag));
    };

    const renderMainContent = () => {
        if (mode === 'add') return <NotesAddForm />;
        if (mode === 'edit') return <NotesEditForm />;
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
                            tags={tags as CategoryFilter[]}
                            selectedTags={selectedTags}
                            onTagClick={handleTagClick}
                        />
                    </div>
                    {renderMainContent()}
                </div>
            </div>
        </div>
    );
};

export default ComponentLayout;
