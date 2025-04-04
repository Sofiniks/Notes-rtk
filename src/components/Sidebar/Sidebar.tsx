import { FiTrash, FiFileText, FiStar } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './Sidebar.module.scss';
import {
    exitEditMode,
    setSectionFilter,
    toggleAddNoteMode,
    setSearchQuery,
    resetCategoryFilters,
} from '../../features/notes/notesSlice';
import { SectionFilter } from '../../features/notes/types';
import { selectNotesSection, selectSearchQuery } from '../../features/notes/notesSelectors';
import { SECTION_FILTERS } from '../../features/notes/constants';

type SidebarItemProps = {
    label: string;
    Icon: React.ElementType;
    onClick?: () => void;
    isActive?: boolean;
};

const SidebarItem = ({ label, Icon, isActive, onClick }: SidebarItemProps) => {
    return (
        <div className={styles.sidebarItem} onClick={onClick}>
            <Icon className={` ${styles.icon} ${isActive && styles.active}`} />
            <span className={` ${styles.label} ${isActive && styles.active}`}>{label}</span>
        </div>
    );
};
const Sidebar = () => {
    const dispatch = useAppDispatch();
    const currentSection = useAppSelector(selectNotesSection);
    const searchQuery = useAppSelector(selectSearchQuery);

    const handleSelectSection = (section: SectionFilter) => {
        dispatch(toggleAddNoteMode(false));
        dispatch(exitEditMode());
        dispatch(resetCategoryFilters());
        dispatch(setSectionFilter(section));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.searchInput}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery || ''}
                    onChange={handleChange}
                />
            </div>
            <nav className="menu">
                <SidebarItem
                    Icon={FiFileText}
                    label="All notes"
                    onClick={() => handleSelectSection(SECTION_FILTERS.ALL as SectionFilter)}
                    isActive={currentSection === SECTION_FILTERS.ALL}
                />
                <SidebarItem
                    Icon={FiTrash}
                    label="Trash"
                    onClick={() => handleSelectSection(SECTION_FILTERS.TRASH as SectionFilter)}
                    isActive={currentSection === SECTION_FILTERS.TRASH}
                />
                <SidebarItem
                    Icon={FiStar}
                    label="Favorites"
                    onClick={() => handleSelectSection(SECTION_FILTERS.FAVORITES as SectionFilter)}
                    isActive={currentSection === SECTION_FILTERS.FAVORITES}
                />
            </nav>
        </aside>
    );
};

export default Sidebar;
