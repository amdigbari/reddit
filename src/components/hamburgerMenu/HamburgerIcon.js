import React from 'react';
import { MdMenu } from 'react-icons/md';

import { GRAY, ICON_MOBILE_SIZE } from '../../utils/staticUtils';

const HamburgerIcon = ({ ...restProps }) => {
    return <MdMenu {...restProps} color={GRAY} size={ICON_MOBILE_SIZE} />;
};

export default HamburgerIcon;
