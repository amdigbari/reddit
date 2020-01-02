import React from 'react';

import styles from './styles.module.scss';

const PostAvatar = ({ src }) => {
    return <img className={styles.avatar} src={src} alt="channel_avatar" width="40" height="40" />;
};
export default PostAvatar;
