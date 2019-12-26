import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const Avatar = ({ src, url, size = 40, style = {} }) => {
    return url ? (
        <div className={[styles.avatar, styles.link].join(' ')} style={{ width: size, height: size }}>
            <img src={src} alt="channel_avatar" width="100%" height="100%" />

            <Link className={styles['__link']} to={url} />
        </div>
    ) : (
        <img className={styles.avatar} src={src} alt="channel_avatar" width={size} height={size} />
    );
};
export default Avatar;
