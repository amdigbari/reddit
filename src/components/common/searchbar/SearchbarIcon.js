import React from 'react';
import { MdSearch } from 'react-icons/md';

import { GRAY, ICON_MOBILE_SIZE } from '../../../utils/staticUtils';

const SearchbarIcon = ({ ...restProps }) => {
    return <MdSearch {...restProps} size={ICON_MOBILE_SIZE} color={GRAY} />;
};

export default SearchbarIcon;
