import React from 'react';
import Sidebar from 'react-sidebar';
import { connect } from 'react-redux';

import Header from '../../header';

import styles from './styles.module.scss';
import { useToggle } from '../customHooks';
import SidebarContent from '../../hamburgerMenu';
import { SHOW_ON_DESKTOP } from '../../../utils/staticUtils';
import Auth from '../../auth/Auth';

const CustomScreen = React.memo(({ children, className = '', loginUser }) => {
    let [menuVisibility, toggleMenuVisibility] = useToggle(false);

    const SidebarComponent = React.useCallback(() => {
        return <SidebarContent toggleMenuVisibility={toggleMenuVisibility} />;
    }, [toggleMenuVisibility]);

    return loginUser.username ? (
        <Sidebar
            onSetOpen={toggleMenuVisibility}
            open={menuVisibility}
            sidebarClassName={styles.sidebar}
            overlayClassName={styles.overlay}
            pullRight
            sidebar={<SidebarComponent />}>
            <article className={styles['page-wrapper']}>
                <Header toggleMenuVisibility={toggleMenuVisibility} />

                <main className={styles['main-content']}>
                    <section className={styles['menubar']} desc={SHOW_ON_DESKTOP}></section>
                    <article className={[styles['page-content'], className].join(' ')}>{children}</article>
                </main>
            </article>
        </Sidebar>
    ) : (
        <Auth />
    );
});

const mapStateTpProps = state => {
    return { loginUser: { username: 'amdigbari' } }; //TODO: remove this
    return { loginUser: state.loginUser };
};

export default connect(mapStateTpProps)(CustomScreen);
