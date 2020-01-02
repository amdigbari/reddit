import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import testProfile from '../../assets/images/test_profile.jpg';
import styles from './styles.module.scss';
import Avatar from '../common/Avatar';
import { unRegisterUser } from '../../actions/AuthActions';

const SidebarContent = React.memo(({ unRegisterUser: logOut }) => {
    const ProfileSection = () => {
        return (
            <Link to="/profile/">
                <div className={[styles['profile-container'], styles['bottom-border']].join(' ')}>
                    <Avatar src={testProfile} size={125} />
                    <p className={styles['profile-name']}>ممد ممدیان</p>
                </div>
            </Link>
        );
    };

    const LinksSection = () => {
        return (
            <>
                <Link to="/posts/">
                    <div className={[styles['link-container'], styles['bottom-border']].join(' ')}>
                        <p>Posts</p>
                    </div>
                </Link>
                <Link to="/channels/">
                    <div className={[styles['link-container'], styles['bottom-border']].join(' ')}>
                        <p>Channels</p>
                    </div>
                </Link>
                <Link to="/notifications/">
                    <div className={[styles['link-container'], styles['bottom-border']].join(' ')}>
                        <p>Notifications</p>
                    </div>
                </Link>
            </>
        );
    };

    return (
        <section className={styles['menu-container']}>
            <ProfileSection />
            <LinksSection />
            <div className={[styles['link-container'], styles['bottom-border'], 'danger'].join(' ')} onClick={logOut}>
                <p>Log out</p>
            </div>
        </section>
    );
});

const mapDispatchToProps = {
    unRegisterUser,
};

export default connect(undefined, mapDispatchToProps)(SidebarContent);
