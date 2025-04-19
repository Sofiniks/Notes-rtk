import styles from './NoteCard.module.scss';
import IconButton from '../../../../components/ui/IconButton/IconButton';
import { getStripeBackground } from '../../utils';

type NoteCardProps = {
    id: string;
    heading: string;
    text: string;
    isFavorite?: boolean;
    tagColors: string[];
    onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onToggleFavorite: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onClick: () => void;
};

const NotesCard = ({
    heading,
    text,
    isFavorite,
    tagColors,
    onDelete,
    onToggleFavorite,
    onClick,
}: NoteCardProps) => {
    return (
        <div
            className={styles.noteCard}
            onClick={onClick}
            style={{
                ['--tag-stripe' as any]: getStripeBackground(tagColors),
            }}
        >
            <div className={styles.noteCardHeader}>
                <h4 className={styles.heading}>{heading}</h4>
                <div className={styles.actionButtons}>
                    <IconButton
                        iconName="star"
                        onClick={onToggleFavorite}
                        isActive={isFavorite}
                        ariaLabel="Add to favorites"
                    />
                    <IconButton iconName="trash" onClick={onDelete} ariaLabel="Delete note" />
                </div>
            </div>
            <p className={styles.noteText}>{text}</p>
        </div>
    );
};

export default NotesCard;
