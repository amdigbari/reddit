import React from 'react';
import { Link } from 'react-router-dom';

import { CustomButton } from '../common/CommonComponents';
import styles from './styles.module.scss';

const AsideMenubar = React.memo(() => {
    const RenderButtons = () => {
        return (
            <>
                <CustomButton className={styles.button}>
                    <Link to="/posts/">
                        <p className={styles.link}>Posts</p>
                    </Link>
                </CustomButton>
                <CustomButton className={styles.button}>
                    <Link to="/channels/">
                        <p className={styles.link}>Channels</p>
                    </Link>
                </CustomButton>
                <CustomButton className={styles.button}>
                    <Link to="/profile/">
                        <p className={styles.link}>Profile</p>
                    </Link>
                </CustomButton>
            </>
        );
    };

    return <RenderButtons />;
});
export default AsideMenubar;
