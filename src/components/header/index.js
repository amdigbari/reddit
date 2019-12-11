import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import RedditLogo from '../common/RedditLogo';
import SearchBar from '../common/searchbar/SearchBar';
import ProfileAvatar from '../profile/ProfileAvatar';
import testProfile from '../../assets/images/test_profile.jpg';
import { Animated } from 'react-animated-css';
import { ANIMATION_DURATION } from '../../utils/staticUtils';
import SearchbarIcon from '../common/searchbar/SearchbarIcon';
import HamburgerIcon from '../hamburgerMenu/HamburgerIcon';

const Header = React.memo(({ openBurgerMenu }) => {
    let [profilePopupVisibility, setProfilePopupVisibility] = React.useState(false);

    const activatePopup = () => setProfilePopupVisibility(true);

    const deactivatePopup = () => setProfilePopupVisibility(false);

    return (
        <header className={styles.container}>
            <RedditLogo />

            <SearchBar search={console.log} desc="showOnDesktop" />

            <>
                <div
                    className={styles['avatar-container']}
                    desc="showOnDesktop"
                    onMouseEnter={activatePopup}
                    onMouseLeave={deactivatePopup}>
                    <ProfileAvatar source={testProfile} />

                    <Animated
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                        animationInDuration={ANIMATION_DURATION}
                        animationOutDuration={ANIMATION_DURATION}
                        isVisible={profilePopupVisibility}
                        className={styles['popup-container']}>
                        <div className={styles.popup}>
                            <Link to="#profile">پروفایل</Link>
                            <Link to="#posts">پست‌ها</Link>
                            <Link to="#channels">کانال‌ها</Link>
                        </div>
                    </Animated>
                </div>
            </>

            <div>
                <SearchbarIcon desc="showOnDevice" style={{ marginRight: 15 }} />
                <HamburgerIcon desc="showOnDevice" onClick={openBurgerMenu} />
            </div>
        </header>
    );
});

export default Header;
