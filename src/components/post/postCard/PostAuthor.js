import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import PostAvatar from './PostAvatar';

const PostAuthor = ({ author }) => {
    return (
        <Link to={'#'}>
            <div className={styles['author-container']}>
                <PostAvatar src={author.avatar} />

                <p className={styles.name}>{author.name}</p>
            </div>
        </Link>
    );
};
export default PostAuthor;
