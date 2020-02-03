import React from 'react';
import { Link } from 'react-router-dom';

import { CustomButton } from '../common/CommonComponents';
import styles from './styles.module.scss';
import { userPostsPath, userChannelsPath, userPath, notificationPath } from '../../utils/pathUtils';

const AsideMenubar = React.memo(({ user }) => {
    const RenderButtons = () => {
        return (
            <>
                <CustomButton className={styles.button}>
                    <Link to={userPostsPath(user.id)} className={styles['link-wrapper']}>
                        <p className={styles.link}>Posts</p>
                    </Link>
                </CustomButton>
                <CustomButton className={styles.button}>
                    <Link to={userChannelsPath(user.id)} className={styles['link-wrapper']}>
                        <p className={styles.link}>Channels</p>
                    </Link>
                </CustomButton>
                <CustomButton className={styles.button}>
                    <Link to={userPath(user.id)} className={styles['link-wrapper']}>
                        <p className={styles.link}>Profile</p>
                    </Link>
                </CustomButton>
                <CustomButton className={styles.button}>
                    <Link to={notificationPath} className={styles['link-wrapper']}>
                        <p className={styles.link}>Notifications</p>
                    </Link>
                </CustomButton>
            </>
        );
    };

    return <RenderButtons />;
});
export default AsideMenubar;
