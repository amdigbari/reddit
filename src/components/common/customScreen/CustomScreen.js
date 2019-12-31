import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { connect } from 'react-redux';

import Header from '../../header';
import styles from './styles.module.scss';
import './material_styles.scss';
import { useToggle } from '../customHooks';
import SidebarContent from '../../hamburgerMenu';
import { SHOW_ON_DESKTOP, IS_IOS } from '../../../utils/staticUtils';
import Auth from '../../auth/Auth';

const CustomScreen = React.memo(({ children, className = '', loginUser }) => {
    let [drawerOpen, toggleDrawerOpen] = useToggle(false);

    const SidebarComponent = () => <SidebarContent />;

    const MaterialSidebar = React.useCallback(
        ({ children }) => {
            return (
                <SwipeableDrawer
                    disableBackdropTransition={!IS_IOS}
                    disableDiscovery={IS_IOS}
                    anchor="right"
                    hysteresis={0.35}
                    swipeAreaWidth={40}
                    transitionDuration={200}
                    open={drawerOpen}
                    onOpen={toggleDrawerOpen}
                    onClose={toggleDrawerOpen}>
                    {children}
                </SwipeableDrawer>
            );
        },
        [drawerOpen, toggleDrawerOpen],
    );

    return loginUser.username ? (
        <>
            <article className={styles['page-wrapper']}>
                <Header toggleMenuVisibility={toggleDrawerOpen} />

                <main className={styles['main-content']}>
                    <section className={styles['menubar']} desc={SHOW_ON_DESKTOP}></section>
                    <article className={[styles['page-content'], className].join(' ')}>{children}</article>
                </main>
            </article>
            <MaterialSidebar>
                <SidebarComponent />
            </MaterialSidebar>
        </>
    ) : (
        <Auth />
    );
});

const mapStateTpProps = state => {
    return { loginUser: { username: 'amdigbari' } }; //TODO: remove this
    return { loginUser: state.loginUser };
};

export default connect(mapStateTpProps)(CustomScreen);
