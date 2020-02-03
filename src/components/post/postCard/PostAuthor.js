import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import Avatar from '../../common/Avatar';
import { userPath } from '../../../utils/pathUtils';

const PostAuthor = ({ author, link = true }) => {
    const RenderAuthor = () => (
        <div className={styles['author-container']}>
            <Avatar src={author.avatar} />

            <p className={styles.name}>{author.name}</p>
        </div>
    );

    return link ? (
        <Link to={userPath(author.id)}>
            <RenderAuthor />
        </Link>
    ) : (
        <RenderAuthor />
    );
};
export default PostAuthor;
