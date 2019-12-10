import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import logo from '../../assets/images/reddit_logo.png';

const RedditLogo = () => {
    return (
        <Link to="#" id={styles['reddit-logo']}>
            <img alt="Reddit" title="Reddit" src={logo} className={styles.avatar} />
            <span className={styles['logo-text']}>DNews</span>
        </Link>
    );
};

export default RedditLogo;
