import React from 'react';
import { Link } from 'react-router-dom';
import { Animated } from 'react-animated-css';

import styles from './styles.module.scss';
import { RedditLogo } from '../common/CommonComponents';
import SearchBar from '../common/searchbar/SearchBar';
import testProfile from '../../assets/images/test_profile.jpg';
import { ANIMATION_DURATION, SHOW_ON_DESKTOP, SHOW_ON_DEVICE } from '../../utils/staticUtils';
import SearchbarIcon from '../common/searchbar/SearchbarIcon';
import HamburgerIcon from '../hamburgerMenu/HamburgerIcon';
import Avatar from '../common/Avatar';

const Header = React.memo(({ toggleMenuVisibility: openBurgerMenu }) => {
    let [profilePopupVisibility, setProfilePopupVisibility] = React.useState(false);

    const activatePopup = () => setProfilePopupVisibility(true);

    const deactivatePopup = () => setProfilePopupVisibility(false);

    return (
        <header className={styles.container}>
            <RedditLogo />

            <SearchBar search={console.log} desc={SHOW_ON_DESKTOP} />

            <>
                <div
                    className={styles['avatar-container']}
                    desc={SHOW_ON_DESKTOP}
                    onMouseEnter={activatePopup}
                    onMouseLeave={deactivatePopup}>
                    <Avatar src={testProfile} size={55} />

                    <Animated
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                        animationInDuration={ANIMATION_DURATION}
                        animationOutDuration={ANIMATION_DURATION}
                        isVisible={profilePopupVisibility}
                        className={styles['popup-container']}>
                        <div className={styles.popup}>
                            <Link to="#profile">پروفایل</Link>
                            <Link to="/posts/">پست‌ها</Link>
                            <Link to="/channels/">کانال‌ها</Link>
                        </div>
                    </Animated>
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
