import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import Avatar from '../../common/Avatar';

const PostAuthor = ({ author, link = true }) => {
    const RenderAuthor = () => (
        <div className={styles['author-container']}>
            <Avatar src={author.avatar} />

            <p className={styles.name}>{author.name}</p>
        </div>
    );

    return link ? (
        <Link to={`/profile/${author.pk}`}>
            <RenderAuthor />
        </Link>
    ) : (
        <RenderAuthor />
    );
};
export default PostAuthor;
