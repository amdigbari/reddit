import React from 'react';
import { Link } from 'react-router-dom';

import testProfile from '../../assets/images/test_profile.jpg';
import styles from './styles.module.scss';
import ProfileAvatar from '../profile/ProfileAvatar';

const SidebarContent = React.memo(props => {
    const ProfileSection = () => {
        return (
            <Link to="#Profile">
                <div className={[styles['profile-container'], styles['bottom-border']].join(' ')}>
                    <ProfileAvatar source={testProfile} size={125} />
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
                <Link to="#Channels">
                    <div className={[styles['link-container'], styles['bottom-border']].join(' ')}>
                        <p>Channels</p>
                    </div>
                </Link>
            </>
        );
    };

    return (
        <section className={styles['menu-container']}>
            <ProfileSection />
            <LinksSection />
        </section>
    );
});

export default SidebarContent;
