import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './styles.module.scss';
import Avatar from '../common/Avatar';
import { unRegisterUser } from '../../actions/AuthActions';
import { userPath, notificationPath } from '../../utils/pathUtils';

const SidebarContent = React.memo(({ unRegisterUser: logOut, user }) => {
    const ProfileSection = () => {
        return (
            <Link to={userPath(user.id)}>
                <div className={[styles['profile-container'], styles['bottom-border']].join(' ')}>
                    <Avatar src={user.picture} size={125} />
                    <p className={styles['profile-name']}>Dier Cohen</p>
                </div>
            </Link>
        );
    };

    const LinksSection = () => {
        return (
            <>
                <Link to={notificationPath}>
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
