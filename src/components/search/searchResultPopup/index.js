import React from 'react';

import styles from './styles.module.scss';
import { Loading } from '../../common/CommonComponents';

const SearchResultPopup = ({ renderResults, className = '', loading, ...restProps }) => {
    return (
        <div className={[styles['container'], className].join(' ')} {...restProps}>
            <Loading />
        </div>
    );
};
export default SearchResultPopup;
