import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Header from './header';

const App = () => {
    return (
        <>
            <Helmet>
                <title>DNews</title>
            </Helmet>

            <Router>
                <Header />
            </Router>
        </>
    );
};

export default App;
