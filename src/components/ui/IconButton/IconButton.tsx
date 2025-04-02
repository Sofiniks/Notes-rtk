import { MouseEventHandler } from 'react';
import { iconMap, IconName } from './iconMap';
import styles from './IconButton.module.scss';

type IconButtonProps = {
    iconName: IconName;
    isActive?: boolean;
    ariaLabel?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const IconButton = ({ iconName, isActive, ariaLabel, onClick }: IconButtonProps) => {
    const Icon = isActive ? iconMap[iconName].active : iconMap[iconName].default;
    return (
        <button className={styles.iconButton} title={ariaLabel} onClick={onClick}>
            <Icon className={styles.icon} />
        </button>
    );
};

export default IconButton;
