import React from 'react';
import { MdNotifications } from 'react-icons/md';
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';

import styles from './styles.module.scss';
import { RedditLogo } from '../common/CommonComponents';
import SearchBar from '../common/searchbar/SearchBar';
import { SHOW_ON_DESKTOP, SHOW_ON_DEVICE, SILVER_GRAY } from '../../utils/staticUtils';
import SearchbarIcon from '../common/searchbar/SearchbarIcon';
import HamburgerIcon from '../hamburgerMenu/HamburgerIcon';
import Avatar from '../common/Avatar';
import { userPath } from '../../utils/pathUtils';
import { getNotifications } from 'actions/ProfileActions';
import './styles.scss';

const Header = React.memo(({ toggleMenuVisibility: openBurgerMenu, user, notificationsCount }) => {
    let [searchQuery, setSearchQuery] = React.useState('');

    const search = React.useCallback(_searchQuery => {
        setSearchQuery(_searchQuery);
    }, []);

    const renderSearchResults = React.useCallback(() => {
        return searchQuery ? <p>Search fucking results</p> : null;
    }, [searchQuery]);

    return (
        <header className={styles.container}>
            <div>
                <HamburgerIcon desc={SHOW_ON_DEVICE} onClick={openBurgerMenu} />
                <SearchbarIcon search={search} renderResults={renderSearchResults} desc={SHOW_ON_DEVICE} style={{ marginLeft: 15 }} />
            </div>

            <RedditLogo />

            <SearchBar search={search} desc={SHOW_ON_DESKTOP} renderResults={renderSearchResults} />

            <>
                <div className={styles['avatar-container']} desc={SHOW_ON_DESKTOP}>
                    <div className={styles['notification-container']}>
                        {notificationsCount ? (
                            <Badge badgeContent={notificationsCount} color="secondary">
                                <MdNotifications color={SILVER_GRAY} size={23} />
                            </Badge>
                        ) : (
                            <MdNotifications color={SILVER_GRAY} size={23} />
                        )}
                    </div>

                    <Avatar src={user.picture} url={userPath(user.id)} size={55} />
                </div>
            </>
        </header>
    );
});

const mapStateToProps = state => {
    return { notificationsCount: state.notificationsCount };
};

export default connect(mapStateToProps)(Header);
