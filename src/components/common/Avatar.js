import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const Avatar = ({ src, url, size = 40, style = {}, className = '', ...restProps }) => {
    return url ? (
        <div className={[styles.avatar, styles.link, className].join(' ')} style={{ width: size, height: size, ...style }} {...restProps}>
            <img src={src} alt="channel_avatar" width="100%" height="100%" />

            <Link className={styles['__link']} to={url} />
        </div>
    ) : (
        <img className={[styles.avatar, className].join(' ')} src={src} alt="channel_avatar" width={size} height={size} style={style} {...restProps} />
    );
};
export default Avatar;
