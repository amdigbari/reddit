import React from 'react';
import { useHistory } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { connect } from 'react-redux';

import Header from '../../header';
import styles from './styles.module.scss';
import './material_styles.scss';
import SidebarContent from '../../hamburgerMenu';
import { SHOW_ON_DESKTOP, IS_IOS } from '../../../utils/staticUtils';
import Auth from '../../auth/Auth';
import AsideMenubar from '../../aside';

const CustomScreen = React.memo(({ children, className = '', loginUser }) => {
    let [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawerOpen = React.useCallback(() => {
        setDrawerOpen(prevState => !prevState);
    }, []);

    let history = useHistory();

    React.useEffect(() => {
        history.listen(() => {
            setDrawerOpen(false);
        });
    }, [history]);

    const SidebarComponent = () => <SidebarContent user={loginUser} />;

    const MaterialSidebar = React.useCallback(
        ({ children }) => {
            return (
                <SwipeableDrawer
                    disableBackdropTransition={!IS_IOS}
                    disableDiscovery={IS_IOS}
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
                <Header toggleMenuVisibility={toggleDrawerOpen} user={loginUser} />

                <main className={styles['main-content']}>
                    <section className={styles['menubar']} desc={SHOW_ON_DESKTOP}>
                        <AsideMenubar user={loginUser} />
                    </section>
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
    return { loginUser: { username: 'amdigbari', pk: 110 } }; //TODO: remove this
    return { loginUser: state.loginUser };
};

export default connect(mapStateTpProps)(CustomScreen);
