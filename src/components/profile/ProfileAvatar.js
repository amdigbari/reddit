import React from 'react';

import styles from './styles.module.scss';

const ProfileAvatar = ({ source, size }) => {
    return (
        <>
            <img src={source} alt="Avatar" className={styles.avatar} desc="showOnDevice" width={size || 55} height={size || 55} />
            <img src={source} alt="Avatar" className={styles.avatar} desc="showOnDesktop" width={size || 55} height={size || 55} />
        </>
    );
};

export default ProfileAvatar;
