import React from 'react';

import styles from './styles.module.scss';
import { RedditLogo } from '../common/CommonComponents';
import SearchBar from '../common/searchbar/SearchBar';
import testProfile from '../../assets/images/test_profile.jpg';
import { SHOW_ON_DESKTOP, SHOW_ON_DEVICE } from '../../utils/staticUtils';
import SearchbarIcon from '../common/searchbar/SearchbarIcon';
import HamburgerIcon from '../hamburgerMenu/HamburgerIcon';
import Avatar from '../common/Avatar';

const Header = React.memo(({ toggleMenuVisibility: openBurgerMenu }) => {
    return (
        <header className={styles.container}>
            <RedditLogo />

            <SearchBar search={console.log} desc={SHOW_ON_DESKTOP} />

            <>
                <div className={styles['avatar-container']} desc={SHOW_ON_DESKTOP}>
                    <Avatar src={testProfile} url="/profile/" size={55} />
                </div>
            </>

            <div>
                <SearchbarIcon desc={SHOW_ON_DEVICE} style={{ marginRight: 15 }} />
                <HamburgerIcon desc={SHOW_ON_DEVICE} onClick={openBurgerMenu} />
            </div>
        </header>
    );
});

export default Header;
