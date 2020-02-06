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
import './styles.scss';
import RenderSearchResults from './searchResults';
import { getSearchResponse } from 'actions/searchActions';
import ScreenWithError from 'components/common/screenWithError';
import { useToggle } from 'components/common/customHooks';

const Header = React.memo(({ toggleMenuVisibility: openBurgerMenu, user, notificationsCount, getSearchResult, setSnackMessage }) => {
    let [searchResult, setSearchResult] = React.useState({});

    let [loading, setLoading] = React.useState(false);

    const search = React.useCallback(_searchQuery => {
        if (_searchQuery.trim().length) {
            setLoading(true);
            getSearchResult(_searchQuery)
                .then(setSearchResult)
                .catch(setSnackMessage)
                .finally(() => setLoading(false));
        } else {
            setSearchResult({});
            setLoading(false);
        }
    }, []);

    const RenderResults = React.useCallback(() => {
        return <RenderSearchResults searchResults={searchResult} setSnackMessage={setSnackMessage} loading={loading} />;
    }, [searchResult, loading]);

    return (
        <header className={styles.container}>
            <div>
                <HamburgerIcon desc={SHOW_ON_DEVICE} onClick={openBurgerMenu} />
                <SearchbarIcon
                    search={search}
                    Results={RenderResults}
                    desc={SHOW_ON_DEVICE}
                    style={{ marginLeft: 15 }}
                    setSnackMessage={setSnackMessage}
                    setLoading={setLoading}
                />
            </div>

            <RedditLogo />

            <SearchBar search={search} setLoading={setLoading} desc={SHOW_ON_DESKTOP} Results={RenderResults} showPopup />

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
const mapDispatchToProps = {
    getSearchResult: getSearchResponse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenWithError(Header));
