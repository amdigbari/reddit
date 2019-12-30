import React from 'react';

import styles from './styles.module.scss';

const PostImage = ({ src }) => {
    return (
        <div className={styles['image-container']}>
            <img src={src} alt="card_image" className={styles['card-image']} />
        </div>
    );
};
export default PostImage;
