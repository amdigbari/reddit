import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import logo from '../../assets/images/reddit_logo.png';

export const RedditLogo = () => {
    return (
        <Link to="/" id={styles['reddit-logo']}>
            <img alt="Reddit" src={logo} className={styles['reddit-avatar']} />
            <span className={styles['logo-text']}>DNews</span>
        </Link>
    );
};

export const Loading = ({ size = 45 }) => {
    const inlineStyles = { width: size, height: size };

    return (
        <div className={styles['loading-spinner-wrapper']} style={inlineStyles}>
            <div className={styles['loading-spinner']}></div>
            <div className={styles['loading-spinner']}></div>
            <div className={styles['loading-spinner']}></div>
            <div className={styles['loading-spinner']}></div>
        </div>
    );
};
