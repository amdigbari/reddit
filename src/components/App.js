import React from 'react';

import RootRouter from './Router';
import RootMeta from './MetaData';

const App = React.memo(() => {
    return (
        <>
            <RootMeta />

            <RootRouter />
        </>
    );
});
export default App;
