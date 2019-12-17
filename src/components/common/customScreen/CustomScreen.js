import React from 'react';
import Sidebar from 'react-sidebar';

import Header from '../../header';

import styles from './styles.module.scss';
import { useToggle } from '../customHooks';
import SidebarContent from '../../hamburgerMenu';

const CustomScreen = React.memo(({ children }) => {
    let [menuVisibility, toggleMenuVisibility] = useToggle(false);

    const SidebarComponent = React.useCallback(() => {
        return <SidebarContent toggleMenuVisibility={toggleMenuVisibility} />;
    }, [toggleMenuVisibility]);

    return (
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
                    <section className={styles['menubar']} desc="showOnDesktop"></section>
                    <article className={styles['page-content']}>{children}</article>
                </main>
            </article>
        </Sidebar>
    );
});

export default CustomScreen;
