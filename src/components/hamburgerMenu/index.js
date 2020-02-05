import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MdNotifications } from 'react-icons/md';
import Badge from '@material-ui/core/Badge';

import styles from './styles.module.scss';
import Avatar from '../common/Avatar';
import { unRegisterUser } from '../../actions/AuthActions';
import { userPath, notificationPath } from '../../utils/pathUtils';
import { SILVER_GRAY } from 'utils/staticUtils';

const SidebarContent = React.memo(({ unRegisterUser: logOut, user, notificationsCount }) => {
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
                        {notificationsCount ? (
                            <Badge badgeContent={notificationsCount} color="secondary">
                                <MdNotifications color={SILVER_GRAY} size={23} />
                            </Badge>
                        ) : (
                            <MdNotifications color={SILVER_GRAY} size={23} />
                        )}
                        <p style={{ marginLeft: 10 }}>Notifications</p>
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

const mapStateToProps = state => {
    return { notificationsCount: state.notificationPath };
};

const mapDispatchToProps = {
    unRegisterUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent);
