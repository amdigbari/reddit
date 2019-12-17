import React from 'react';

import styles from './styles.module.scss';
import PostAvatar from './PostAvatar';

const PostAuthor = ({ author }) => {
    return (
        <div className={styles['author-container']}>
            <PostAvatar src={author.avatar} />

            <p className={styles.name}>{author.name}</p>
        </div>
    );
};
export default PostAuthor;
