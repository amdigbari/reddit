import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const Avatar = ({ src, url }) => {
    return url ? (
        <Link to={url} style={{ marginLeft: 7 }}>
            <img className={[styles.avatar, styles.link].join(' ')} src={src} alt="channel_avatar" width="40" height="40" />
        </Link>
    ) : (
        <img className={styles.avatar} src={src} alt="channel_avatar" width="40" height="40" />
    );
};
export default Avatar;
