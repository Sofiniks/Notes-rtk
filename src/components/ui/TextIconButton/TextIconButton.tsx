import { MouseEventHandler } from 'react';
import { iconMap, IconName } from '../iconMap';
import styles from './TextIconButton.module.scss';

type IconButtonProps = {
    iconName: IconName;
    isActive?: boolean;
    ariaLabel?: string;
    text?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const TextIconButton = ({ iconName, isActive, text, ariaLabel, onClick }: IconButtonProps) => {
    const Icon = isActive ? iconMap[iconName].active : iconMap[iconName].default;
    return (
        <button className={styles.iconButton} title={ariaLabel} onClick={onClick}>
            <Icon className={styles.icon} />
            {text && text}
        </button>
    );
};

export default TextIconButton;
