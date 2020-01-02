import React from 'react';
import { Helmet } from 'react-helmet';

import { PRIMARY_COLOR } from '../utils/staticUtils';

const RootMeta = () => {
    return (
        <Helmet>
            <title>DNews</title>

            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
            <meta name="theme-color" content={PRIMARY_COLOR} />
        </Helmet>
    );
};
export default RootMeta;
