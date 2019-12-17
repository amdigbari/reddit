import React from 'react';

import styles from './styles.module.scss';
import PostAvatar from './PostAvatar';

const PostChannel = ({ channel }) => {
    return (
        <div className={styles.header}>
            <PostAvatar src={channel.logo} />
            <p className={styles.name}>{channel.name}</p>
        </div>
    );
};
export default PostChannel;
