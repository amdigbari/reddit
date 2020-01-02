import React from 'react';
import { Link } from 'react-router-dom';

import { CustomButton } from '../common/CommonComponents';
import styles from './styles.module.scss';

const AsideMenubar = React.memo(() => {
    const RenderButtons = () => {
        return (
            <>
                <CustomButton className={styles.button}>
                    <Link to="/posts/" className={styles['link-wrapper']}>
                        <p className={styles.link}>Posts</p>
                    </Link>
                </CustomButton>
                <CustomButton className={styles.button}>
                    <Link to="/channels/" className={styles['link-wrapper']}>
                        <p className={styles.link}>Channels</p>
                    </Link>
                </CustomButton>
                <CustomButton className={styles.button}>
                    <Link to="/profile/" className={styles['link-wrapper']}>
                        <p className={styles.link}>Profile</p>
                    </Link>
                </CustomButton>
                <CustomButton className={styles.button}>
                    <Link to="/notifications/" className={styles['link-wrapper']}>
                        <p className={styles.link}>Notifications</p>
                    </Link>
                </CustomButton>
            </>
        );
    };

    return <RenderButtons />;
});
export default AsideMenubar;
