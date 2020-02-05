import React from 'react';
import { useHistory } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { connect } from 'react-redux';

import Header from 'components/header';
import styles from './styles.module.scss';
import './material_styles.scss';
import SidebarContent from 'components/hamburgerMenu';
import { SHOW_ON_DESKTOP, IS_IOS } from 'utils/staticUtils';
import Auth from 'components/auth/Auth';
import AsideMenubar from 'components/aside';
import { getNotifications } from 'actions/ProfileActions';
import CreatePostModal from 'components/post/createPost';
import CreateChannelModal from 'components/channel/createChannel';
import { useToggle } from '../customHooks';
import { postPath, channelPath } from 'utils/pathUtils';

const CustomScreen = React.memo(({ children, className = '', loginUser, getNotifications }) => {
    let [drawerOpen, setDrawerOpen] = React.useState(false);
    let [addPostModal, toggleAddPostModal] = useToggle(false);
    let [addChannelModal, toggleAddChannelModal] = useToggle(false);

    const toggleDrawerOpen = React.useCallback(() => {
        setDrawerOpen(prevState => !prevState);
    }, []);

    let history = useHistory();

    React.useEffect(() => {
        history.listen(() => {
            setDrawerOpen(false);
            getNotifications().catch(console.log);
        });
    }, [history]);

    const addCallback = type => response => {
        history.push(type === 'post' ? postPath(response.id) : channelPath(response.id));
    };

    const showModal = func => () => {
        setDrawerOpen(false);
        func();
    };

    return loginUser.username ? (
        <>
            <article className={styles['page-wrapper']}>
                <Header toggleMenuVisibility={toggleDrawerOpen} user={loginUser} />

                <main className={styles['main-content']}>
                    <section className={styles['menubar']} desc={SHOW_ON_DESKTOP}>
                        <AsideMenubar
                            user={loginUser}
                            showCreatePost={showModal(toggleAddPostModal)}
                            showCreateChannel={showModal(toggleAddChannelModal)}
                        />
                    </section>
                    <article className={[styles['page-content'], className].join(' ')}>{children}</article>
                </main>
            </article>

            <SwipeableDrawer open={drawerOpen} onOpen={toggleDrawerOpen} onClose={toggleDrawerOpen}>
                <SidebarContent
                    user={loginUser}
                    showCreatePost={showModal(toggleAddPostModal)}
                    showCreateChannel={showModal(toggleAddChannelModal)}
                />
            </SwipeableDrawer>

            <>
                <CreatePostModal modalVisibility={addPostModal} toggleModalVisibility={toggleAddPostModal} callback={addCallback('post')} />
                <CreateChannelModal
                    modalVisibility={addChannelModal}
                    toggleModalVisibility={toggleAddChannelModal}
                    callback={addCallback('channel')}
                />
            </>
        </>
    ) : (
        <Auth />
    );
});

const mapStateTpProps = state => {
    return { loginUser: state.loginUser };
};

const mapDispatchToProps = {
    getNotifications,
};
export default connect(mapStateTpProps, mapDispatchToProps)(CustomScreen);
