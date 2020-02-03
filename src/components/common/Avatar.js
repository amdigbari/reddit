import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import image from 'assets/images/default_profile.png';

const Avatar = ({ src, url, size = 40, style = {}, className = '', ...restProps }) => {
    return (
        <div className={[styles.avatar, styles.link, className].join(' ')} style={{ width: size, height: size, ...style }} {...restProps}>
            <img src={src || image} alt="channel_avatar" style={{ maxWidth: '100%', maxHeight: '100%' }} />

            {url && <Link className={styles['__link']} to={url} />}
        </div>
    );
};
export default Avatar;
