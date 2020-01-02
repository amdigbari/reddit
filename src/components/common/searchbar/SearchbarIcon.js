import React from 'react';
import { MdSearch } from 'react-icons/md';

import { GRAY, ICON_MOBILE_SIZE } from '../../../utils/staticUtils';
import SearchModal from '../../search/searchModal';
import { useToggle } from '../customHooks';

const SearchbarIcon = ({ search, renderResults, ...restProps }) => {
    let [searchModalVisibility, toggleSearchModalVisibility] = useToggle(false);

    return (
        <>
            <MdSearch {...restProps} size={ICON_MOBILE_SIZE} color={GRAY} onClick={toggleSearchModalVisibility} />

            <SearchModal
                search={search}
                renderResults={renderResults}
                modalVisibility={searchModalVisibility}
                toggleModalVisibility={toggleSearchModalVisibility}
            />
        </>
    );
};

export default SearchbarIcon;
