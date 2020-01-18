import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import Avatar from '../../common/Avatar';
import { postPath, userPath } from '../../../utils/pathUtils';

const NotificationCard = ({ notification: { user, post, like }, showBorder, className, ...restProps }) => {
    const RenderPostNotificationText = () => {
        return (
            <>
                {like ? 'has liked your' : 'has commented on your'}{' '}
                {
                    <Link className={[styles['post-link'], 'danger'].join(' ')} to={postPath(post.pk)}>
                        post
                    </Link>
                }
                !
            </>
        );
    };

    return (
        <div className={[styles['card-container'], showBorder ? 'border-bottom' : '', className].join(' ')} {...restProps}>
            <Avatar src={user.avatar} />

            <div className={styles['notification-text-container']}>
                <p>
                    <Link className={styles['post-link']} to={userPath(user.pk)}>
                        {user.name}
                    </Link>{' '}
                    {post ? <RenderPostNotificationText /> : 'has followed you'}
                </p>
            </div>
        </div>
    );
};
export default NotificationCard;
