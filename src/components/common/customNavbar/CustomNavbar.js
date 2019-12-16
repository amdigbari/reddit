import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const CustomNavbar = React.memo(({ navigators = [], renderComponent, linkNavigators = false, containerStyle = '' }) => {
    let [activeNavigator, setActiveNavigator] = React.useState(navigators.length ? navigators[0].id : null);

    const changeActiveNavigator = activeId => {
        setActiveNavigator(activeId);
    };

    const activeIndex = React.useMemo(() => navigators.map(navigator => navigator.id).indexOf(activeNavigator), [
        activeNavigator,
        navigators,
    ]);

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
                            className={[styles.navigator, activeNavigator === navigator.id ? styles['active-navigator'] : ''].join(' ')}
                            key={navigator.id}
                            onClick={() => changeActiveNavigator(navigator.id)}>
                            {navigator.title}
                        </p>
                    ),
                )}

                <div
                    className={styles['navbar-line-container']}
                    style={{ width: `${100 / navigators.length}%`, transform: `translateX(${activeIndex ? `${activeIndex * 100}%` : 0})` }}>
                    <div className={styles['navbar-line-wrapper']}>
                        <div className={styles['navbar-line']}></div>
                    </div>
                </div>
            </nav>
            {renderComponent && <section className={styles.content}>{renderComponent(activeNavigator)}</section>}
        </article>
    );
});
export default CustomNavbar;
