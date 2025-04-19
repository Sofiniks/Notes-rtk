import { FiStar, FiTrash } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';

export const iconMap = {
    star: {
        default: FiStar,
        active: AiFillStar,
    },
    trash: {
        default: FiTrash,
        active: FiTrash,
    },
    plus: {
        default: FiPlus,
        active: FiPlus,
    },
};

export type IconName = keyof typeof iconMap;
