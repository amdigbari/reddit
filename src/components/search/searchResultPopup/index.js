import React from 'react';

import styles from './styles.module.scss';

const SearchResultPopup = ({ Results, className = '', ...restProps }) => {
    return (
        <div className={[styles['container'], className].join(' ')} {...restProps}>
            {<Results />}
        </div>
    );
};
export default SearchResultPopup;
