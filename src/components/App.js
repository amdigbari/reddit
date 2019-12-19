import React from 'react';
import RootRouter from './Router';
import RootMeta from './MetaData';

const App = React.memo(props => {
    return (
        <>
            <RootMeta />

            <RootRouter />
        </>
    );
});

export default App;
