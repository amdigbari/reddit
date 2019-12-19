import React from 'react';

import styles from './styles.module.scss';
import { SHOW_ON_DESKTOP, SHOW_ON_DEVICE } from '../../utils/staticUtils';

const ProfileAvatar = ({ source, size, className = '', ...restProps }) => {
    return (
        <>
            <img src={source} alt="Avatar" className={[styles.avatar, className].join(' ')} desc={SHOW_ON_DEVICE} width={size || 55} height={size || 55} {...restProps} />
            <img src={source} alt="Avatar" className={[styles.avatar, className].join(' ')} desc={SHOW_ON_DESKTOP} width={size || 55} height={size || 55} {...restProps} />
        </>
    );
};

export default ProfileAvatar;
