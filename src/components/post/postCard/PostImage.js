import React from 'react';

import image from 'assets/images/default_profile.png';
import styles from './styles.module.scss';

const PostImage = ({ src }) => {
    return (
        <div className={styles['image-container']}>
            <img src={src || image} alt="card_image" className={styles['card-image']} />
        </div>
    );
};
export default PostImage;
