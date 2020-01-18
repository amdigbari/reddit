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

            <SwipeableDrawer open={drawerOpen} onOpen={toggleDrawerOpen} onClose={toggleDrawerOpen}>
                <SidebarContent user={loginUser} />
            </SwipeableDrawer>
        </>
    ) : (
        <Auth />
    );
});

const mapStateTpProps = state => {
    return { loginUser: state.loginUser };
};

export default connect(mapStateTpProps)(CustomScreen);
