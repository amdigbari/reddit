import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { postPath, userPath, commentPath } from '../../../utils/pathUtils';
import { NOTIFICATION_TYPES } from 'utils/staticUtils';

const NotificationCard = ({ notification: { situation, For, who_name, who_id }, showBorder, className, ...restProps }) => {
    const RenderPostNotificationText = () => {
        switch (situation) {
            case NOTIFICATION_TYPES.FOLLOWED:
                return 'has followed you';
            case NOTIFICATION_TYPES.LIKE_ON_POST:
                return (
                    <>
                        has liked your
                        <Link className={[styles['post-link'], 'danger'].join(' ')} to={postPath(For.id)}>
                            post
                        </Link>
                    </>
                );
            case NOTIFICATION_TYPES.LIKE_ON_COMMENT:
                return (
                    <>
                        has liked your
                        <Link className={[styles['post-link'], 'danger'].join(' ')} to={commentPath(For.id)}>
                            comment
                        </Link>
                    </>
                );
            case NOTIFICATION_TYPES.COMMENT_ON_COMMENT:
                return (
                    <>
                        has commented your
                        <Link className={[styles['post-link'], 'danger'].join(' ')} to={commentPath(For.id)}>
                            comment
                        </Link>
                    </>
                );
            default:
                return (
                    <>
                        has commented your
                        <Link className={[styles['post-link'], 'danger'].join(' ')} to={postPath(For.id)}>
                            post
                        </Link>
                    </>
                );
        }
    };

    return (
        <div className={[styles['card-container'], showBorder ? 'border-bottom' : '', className].join(' ')} {...restProps}>
            <div className={styles['notification-text-container']}>
                <p>
                    <Link className={styles['post-link']} to={userPath(who_id)}>
                        {who_name}
                    </Link>{' '}
                    <RenderPostNotificationText />
                </p>
            </div>
        </div>
    );
};
export default NotificationCard;
