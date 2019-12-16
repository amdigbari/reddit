import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

import styles from './styles.module.scss';

const PostCard = React.memo(({ post }) => {
    return (
        <div className={styles['card-container']}>
            {/* TODO: header -> channel:component */}

            <div className={styles['image-container']}>
                <img src={post.image} alt="card_image" className={styles['card-image']} />
            </div>

            <LinesEllipsis
                component={'p'}
                text={post.caption}
                className={styles['caption-container']}
                maxLine={3}
                ellipsis="..."
                trimRight={false}
            />

            {/* TODO: author, score: component */}
        </div>
    );
});
export default PostCard;
