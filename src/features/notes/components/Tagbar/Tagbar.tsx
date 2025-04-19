import { CategoryFilter, Tag } from '../../types';
import styles from './Tagbar.module.scss';

type TagbarProps = {
    tags: Tag[];
    selectedTags: string[];
    onTagClick: (tag: CategoryFilter) => void;
};

const Tagbar = ({ tags, selectedTags, onTagClick }: TagbarProps) => {
    return (
        <div className={styles.tagbar}>
            {tags.map(({ name, color }) => {
                const isActive = selectedTags.some((tag) => tag === name);

                return (
                    <div
                        key={name}
                        style={{ backgroundColor: color }}
                        className={`${styles.tag} ${isActive ? styles.active : ''}`}
                        onClick={() => onTagClick(name)}
                    >
                        {name}
                    </div>
                );
            })}
        </div>
    );
};

export default Tagbar;
