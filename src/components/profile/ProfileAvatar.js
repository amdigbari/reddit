import React from 'react';

import styles from './styles.module.scss';

const ProfileAvatar = ({ source, size, className = '', ...restProps }) => {
    return (
        <>
            <img src={source} alt="Avatar" className={[styles.avatar, className].join(' ')} desc="showOnDevice" width={size || 55} height={size || 55} {...restProps} />
            <img src={source} alt="Avatar" className={[styles.avatar, className].join(' ')} desc="showOnDesktop" width={size || 55} height={size || 55} {...restProps} />
        </>
    );
};

export default ProfileAvatar;
