import React from 'react';

import styles from './styles.module.scss';
import RedditLogo from '../common/RedditLogo';
import SearchBar from '../common/SearchBar';
import ProfileAvatar from '../profile/ProfileAvatar';
import testProfile from '../../assets/images/test_profile.jpg';
import { Animated } from 'react-animated-css';
import { ANIMATION_DURATION } from '../../utils/staticUtils';

const Header = React.memo(props => {
    let [profilePopupVisibility, setProfilePopupVisibility] = React.useState(false);

    const activatePopup = () => setProfilePopupVisibility(true);

    const deactivatePopup = () => setProfilePopupVisibility(false);

    return (
        <div className={styles.container}>
            <RedditLogo />
            <SearchBar search={console.log} />
            <div className={styles['avatar-container']} onMouseEnter={activatePopup} onMouseLeave={deactivatePopup}>
                <ProfileAvatar source={testProfile} />

                <Animated
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    animationInDuration={ANIMATION_DURATION}
                    animationOutDuration={ANIMATION_DURATION}
                    isVisible={profilePopupVisibility}
                    className={styles['popup-container']}>
                    <div className={styles.popup}>
                        <div>سلام</div>
                        <div>سلام</div>
                    </div>
                </Animated>
            </div>
        </div>
    );
});

export default Header;
