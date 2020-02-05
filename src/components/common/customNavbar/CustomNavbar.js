import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { Loading } from '../CommonComponents';

const CustomNavbar = React.memo(
    ({ navigators = [], renderComponent, linkNavigators = false, containerStyle = '', setActiveId, activeId, loading }) => {
        const changeActiveNavigator = activeId => {
            setActiveId(activeId);
        };

        const activeIndex = React.useMemo(() => navigators.map(navigator => navigator.id).indexOf(activeId), [activeId, navigators]);

        return (
            <article className={[styles.container, containerStyle].join(' ')}>
                <nav className={styles.navbar}>
                    {navigators.map(navigator =>
                        linkNavigators ? (
                            <Link to={navigator.to} key={navigator.id}>
                                {navigator.title}
                            </Link>
                        ) : (
                            <p
                                className={[styles.navigator, activeId === navigator.id ? styles['active-navigator'] : ''].join(' ')}
                                key={navigator.id}
                                onClick={() => changeActiveNavigator(navigator.id)}>
                                {navigator.title}
                            </p>
                        ),
                    )}

                    <div
                        className={styles['navbar-line-container']}
                        style={{
                            width: `${100 / navigators.length}%`,
                            transform: `translateX(${activeIndex ? `${activeIndex * 100}%` : 0})`,
                        }}>
                        <div className={styles['navbar-line-wrapper']}>
                            <div className={styles['navbar-line']}></div>
                        </div>
                    </div>
                </nav>
                {loading ? <Loading /> : renderComponent && <section className={styles.content}>{renderComponent()}</section>}
            </article>
        );
    },
);
export default CustomNavbar;
