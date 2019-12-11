import React from 'react';

import Header from '../../header';

import styles from './styles.module.scss';

const CustomScreen = React.memo(({ children }) => {
    return (
        <article className={styles['page-wrapper']}>
            <Header />

            <main>{children}</main>
        </article>
    );
});

export default CustomScreen;
