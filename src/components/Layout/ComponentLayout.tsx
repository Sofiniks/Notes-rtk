import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleAddNoteMode, updateVisibleNotes } from '../../features/notes/notesSlice';
import styles from './ComponentLayout.module.scss';
import Tagbar from '../../features/notes/components/Tagbar/Tagbar';
import Sidebar from '../Sidebar/Sidebar';
import NotesList from '../../features/notes/components/NotesList/NotesList';
import NotesAddForm from '../../features/notes/components/NotesAddForm/NotesAddForm';
import IconButton from '../ui/IconButton/IconButton';
import { selectIsAddingMode, selectIsEditMode } from '../../features/notes/notesSelectors';
import NotesEditForm from '../../features/notes/components/EditNoteForm/EditNoteForm';

const ComponentLayout = () => {
    const dispatch = useAppDispatch();
    const isAddMode = useAppSelector(selectIsAddingMode);
    const isEditMode = useAppSelector(selectIsEditMode);

    useEffect(() => {
        dispatch(updateVisibleNotes());
    }, [dispatch]);

    const renderMainContent = () => {
        if (isAddMode) return <NotesAddForm />;
        if (isEditMode) return <NotesEditForm />;
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
                            onClick={() => dispatch(toggleAddNoteMode(true))}
                        />
                        <Tagbar />
                    </div>
                    {renderMainContent()}
                </div>
            </div>
        </div>
    );
};

export default ComponentLayout;
