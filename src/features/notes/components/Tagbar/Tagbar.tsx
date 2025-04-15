import { CategoryFilter } from '../../types';
import styles from './Tagbar.module.scss';

type TagbarProps = {
    tags: CategoryFilter[];
    selectedTags: CategoryFilter[];
    onTagClick: (tag: CategoryFilter) => void;
};

const Tagbar = ({ tags, selectedTags, onTagClick }: TagbarProps) => {
    return (
        <div className={styles.tagbar}>
            {tags.map((item) => {
                const isActive = selectedTags.includes(item);
                return (
                    <div
                        key={item}
                        className={`${styles.tag} ${styles[item]} ${isActive ? styles.active : ''}`}
                        onClick={() => onTagClick(item)}
                    >
                        {item}
                    </div>
                );
            })}
        </div>
    );
};

export default Tagbar;
