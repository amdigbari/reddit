import React from 'react';

import styles from './styles.module.scss';
import { RedditLogo } from '../common/CommonComponents';
import SearchBar from '../common/searchbar/SearchBar';
import testProfile from '../../assets/images/test_profile.jpg';
import { SHOW_ON_DESKTOP, SHOW_ON_DEVICE } from '../../utils/staticUtils';
import SearchbarIcon from '../common/searchbar/SearchbarIcon';
import HamburgerIcon from '../hamburgerMenu/HamburgerIcon';
import Avatar from '../common/Avatar';
import { userPath } from '../../utils/pathUtils';

const Header = React.memo(({ toggleMenuVisibility: openBurgerMenu, user }) => {
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
                    <Avatar src={testProfile} url={userPath(user.id)} size={55} />
                </div>
            </>
        </header>
    );
});

export default Header;
