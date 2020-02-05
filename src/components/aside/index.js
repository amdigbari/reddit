import React from 'react';
import { Link } from 'react-router-dom';

import { CustomButton } from '../common/CommonComponents';
import styles from './styles.module.scss';
import { userPath, notificationPath } from '../../utils/pathUtils';

const AsideMenubar = React.memo(({ user, showCreateChannel, showCreatePost }) => {
    const RenderButtons = () => {
        return (
            <>
                <CustomButton className={styles.button} onClick={showCreatePost}>
                    <p className={styles.link}>Create Post</p>
                </CustomButton>
                <CustomButton className={styles.button} onClick={showCreateChannel}>
                    <p className={styles.link}>Create Channel</p>
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
