import React from 'react';
import { MdChevronLeft } from 'react-icons/md';

import styles from './styles.module.scss';
import { SILVER_GRAY } from '../../../utils/staticUtils';

const CustomScreenWithBackButton = ({ goBack, title, children, ...restProps }) => {
    return (
        <div className={styles['main-container']} {...restProps}>
            <header className={styles.header}>
                <MdChevronLeft className={styles['back-button']} size={30} onClick={goBack} />

                <p>{title}</p>

                <MdChevronLeft color={SILVER_GRAY} size={30} style={{ visibility: 'hidden' }} />
            </header>

            <div className={styles['page-content']}>{children}</div>
        </div>
    );
};
export default CustomScreenWithBackButton;
