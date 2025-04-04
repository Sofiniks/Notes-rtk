import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectedCategoryFilter, selectIsAddingMode, selectIsEditMode } from '../../notesSelectors';
import { exitEditMode, toggleCategoryFilter, toggleAddNoteMode } from '../../notesSlice';
import { CategoryFilter } from '../../types';
import styles from './Tagbar.module.scss';

const tags: CategoryFilter[] = ['shopping', 'business', 'other'];
const Tagbar = () => {
    const dispatch = useAppDispatch();
    const selectedTags = useAppSelector(selectedCategoryFilter);
    const isEditMode = useAppSelector(selectIsEditMode);
    const isAddingMode = useAppSelector(selectIsAddingMode);

    const handleTagClick = (item: CategoryFilter) => {
        if (isEditMode) {
            dispatch(exitEditMode());
        }
        if (isAddingMode) {
            dispatch(toggleAddNoteMode(false));
        }
        dispatch(toggleCategoryFilter(item));
    };
    return (
        <div className={styles.tagbar}>
            {tags.map((item) => {
                const isActive = selectedTags.includes(item);
                return (
                    <div
                        key={item}
                        className={`${styles.tag} ${styles[item]} ${isActive ? styles.active : ''}`}
                        onClick={() => handleTagClick(item)}
                    >
                        {item}
                    </div>
                );
            })}
        </div>
    );
};

export default Tagbar;
