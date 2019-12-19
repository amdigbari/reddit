import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import Avatar from '../../common/Avatar';

const PostChannel = ({ channel }) => {
    return (
        <Link to={'#'}>
            <div className={styles['channel-name']}>
                <Avatar src={channel.logo} />
                <p className={styles.name}>{channel.name}</p>
            </div>
        </Link>
    );
};
export default PostChannel;
