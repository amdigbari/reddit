import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import Avatar from '../../common/Avatar';
import { channelPath } from '../../../utils/pathUtils';

const PostChannel = ({ channel, link = true }) => {
    const RenderChannel = () => (
        <div className={styles['channel-name']}>
            <Avatar src={channel.logo} />
            <p className={styles.name}>{channel.name}</p>
        </div>
    );

    return link ? (
        <Link to={channelPath(channel.pk)}>
            <RenderChannel />
        </Link>
    ) : (
        <RenderChannel />
    );
};
export default PostChannel;
