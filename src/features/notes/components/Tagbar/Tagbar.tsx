import { useAppDispatch } from '../../../../app/hooks';
import { exitEditMode, setCategoryFilter, toggleAddNoteMode } from '../../notesSlice';
import { CategoryFilter } from '../../types';
import styles from './Tagbar.module.scss';

const tags: CategoryFilter[] = ['shopping', 'business', 'other'];
const Tagbar = () => {
    const dispatch = useAppDispatch();

    const handleTagClick = (item: CategoryFilter) => {
        dispatch(exitEditMode());
        dispatch(toggleAddNoteMode(false));
        dispatch(setCategoryFilter(item));
    };
    return (
        <div className={styles.tagbar}>
            {tags.map((item) => {
                return (
                    <div
                        key={item}
                        className={`${styles.tag} ${styles[item]}`}
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
