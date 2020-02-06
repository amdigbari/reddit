import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import image from 'assets/images/default_profile.png';
import { BASE_BACK_URL } from 'api';

const Avatar = ({ src, url, size = 40, style = {}, className = '', ...restProps }) => {
    let [mainSrc, setSrc] = React.useState(image);

    React.useLayoutEffect(() => {
        let img = new Image();
        img.src = src && !src.match(/^http/) && src.match(/\/image\//) ? `${BASE_BACK_URL}${src}` : src;

        img.onload = () => {
            setSrc(img.src);
        };
    }, []);

    return (
        <div className={[styles.avatar, styles.link, className].join(' ')} style={{ width: size, height: size, ...style }} {...restProps}>
            <img src={mainSrc} alt="channel_avatar" style={{ maxWidth: '100%', maxHeight: '100%' }} />

            {url && <Link className={styles['__link']} to={url} />}
        </div>
    );
};
export default Avatar;
