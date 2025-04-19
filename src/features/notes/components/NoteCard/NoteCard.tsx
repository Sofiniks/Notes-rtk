import styles from './NoteCard.module.scss';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { SectionFilter } from '../../types';
import { SECTION_FILTERS } from '../../constants';
import IconButton from '../../../../components/ui/IconButton/IconButton';
import { moveToTrash, toggleFavorite, deleteNote, startEditNote } from '../../notesSlice';
import { selectNotesSection } from '../../notesSelectors';
import { getStripeBackground } from '../../utils';

type NoteCardProps = {
    id: string;
    heading: string;
    text: string;
    isFavorite?: boolean;
    tagColors: string[];
};

const NotesCard = ({ id, heading, text, isFavorite, tagColors }: NoteCardProps) => {
    const dispatch = useAppDispatch();
    const currentSection = useAppSelector(selectNotesSection);

    const handleDelete = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string,
        section: SectionFilter,
    ) => {
        e.stopPropagation();
        if (section === SECTION_FILTERS.TRASH) {
            dispatch(deleteNote(id));
        } else {
            dispatch(moveToTrash(id));
        }
    };

    const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();
        dispatch(toggleFavorite(id));
    };

    return (
        <div
            className={styles.noteCard}
            onClick={() => dispatch(startEditNote(id))}
            style={{
                ['--tag-stripe' as any]: getStripeBackground(tagColors),
            }}
        >
            <div className={styles.noteCardHeader}>
                <h4 className={styles.heading}>{heading}</h4>
                <div className={styles.actionButtons}>
                    <IconButton
                        iconName="star"
                        onClick={(e) => handleToggleFavorite(e, id)}
                        isActive={isFavorite}
                        ariaLabel="Add to favorites"
                    />
                    <IconButton
                        iconName="trash"
                        onClick={(e) => handleDelete(e, id, currentSection)}
                        ariaLabel="Delete note"
                    />
                </div>
            </div>
            <p className={styles.noteText}>{text}</p>
        </div>
    );
};

export default NotesCard;
