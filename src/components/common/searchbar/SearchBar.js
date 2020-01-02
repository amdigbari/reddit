import React from 'react';

import styles from './styles.module.scss';
import { useDepsChanged } from '../customHooks';
import { SEARCH_DELAY } from '../../../utils/staticUtils';
import Input from '@material-ui/core/Input';

const SearchBar = React.memo(({ search, ...restProps }) => {
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

    const keyUpHandler = ({ target }) => {
        setSearchQuery(target.value.trim());
        resetTimeout();

        interval.current = setTimeout(() => {
            setIsTyping(false);
        }, SEARCH_DELAY);
    };

    let isTypingChangedHandler = React.useCallback(() => {
        !isTyping && searchQuery.length && search(searchQuery);
    }, [isTyping, searchQuery, search]);

    useDepsChanged(isTypingChangedHandler, [isTyping]);

    return (
        <div className={styles['searchbar-container']} {...restProps}>
            <div className={styles['searchbar-wrapper']}>
                <Input
                    className={[styles.searchbar, 'small-mobile'].join(' ')}
                    type="text"
                    placeholder="جست‌وجو کنید..."
                    onKeyDown={keyDownHandler}
                    onKeyUp={keyUpHandler}
                    color="secondary"
                />
            </div>
        </div>
    );
});

export default SearchBar;
