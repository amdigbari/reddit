import React from 'react';

import styles from './styles.module.scss';
import RedditLogo from '../common/RedditLogo';
import SearchBar from '../common/SearchBar';

const Header = React.memo(props => {
    return (
        <div className={styles.container}>
            <RedditLogo />
            <SearchBar search={console.log} />
        </div>
    );
});

export default Header;
