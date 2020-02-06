import React from 'react';
import { MdSearch } from 'react-icons/md';

import { GRAY, ICON_MOBILE_SIZE } from '../../../utils/staticUtils';
import SearchModal from '../../search/searchModal';
import { useToggle } from '../customHooks';

const SearchbarIcon = ({ search, Results, setLoading, ...restProps }) => {
    let [searchModalVisibility, toggleSearchModalVisibility] = useToggle(false);

    return (
        <>
            <MdSearch {...restProps} size={ICON_MOBILE_SIZE} color={GRAY} onClick={toggleSearchModalVisibility} />

            <SearchModal
                search={search}
                Results={Results}
                modalVisibility={searchModalVisibility}
                toggleModalVisibility={toggleSearchModalVisibility}
                setLoading={setLoading}
            />
        </>
    );
};

export default SearchbarIcon;
