import React from 'react';

import styles from './styles.module.scss';
import { useDepsChanged } from '../customHooks';
import { SEARCH_DELAY } from 'utils/staticUtils';
import Input from '@material-ui/core/Input';
import SearchResultPopup from 'components/search/searchResultPopup';

const SearchBar = React.memo(({ search, autoFocus = false, Results, setLoading, showPopup = false, ...restProps }) => {
    let interval = React.useRef();

    let [isTyping, setIsTyping] = React.useState(false);
    let [searchQuery, setSearchQuery] = React.useState('');

    const resetTimeout = () => {
        interval.current && clearTimeout(interval.current);
        interval.current = null;
    };

    const keyDownHandler = () => {
        setIsTyping(true);
        resetTimeout();
    };

    const changeHandler = ({ target }) => {
        setSearchQuery(target.value);
        resetTimeout();

        interval.current = setTimeout(() => {
            setIsTyping(false);
        }, SEARCH_DELAY);
    };

    let isTypingChangedHandler = React.useCallback(() => {
        setLoading && setLoading(isTyping);
        !isTyping && search(searchQuery.trim());
    }, [isTyping, searchQuery, search, setLoading]);

    useDepsChanged(isTypingChangedHandler, [isTyping]);

    return (
        <div className={styles['searchbar-container']} {...restProps}>
            <div className={styles['searchbar-wrapper']}>
                <Input
                    className={[styles.searchbar, 'small-mobile'].join(' ')}
                    type="text"
                    placeholder="Search..."
                    onKeyDown={keyDownHandler}
                    onChange={changeHandler}
                    value={searchQuery}
                    color="secondary"
                    autoFocus={autoFocus}
                />

                {showPopup && searchQuery.trim().length ? <SearchResultPopup Results={Results} loading={isTyping} /> : ''}
            </div>
        </div>
    );
});

export default SearchBar;
