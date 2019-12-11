import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Homepage from './homepage';
import NotFount from './notFount';

const App = React.memo(props => {
    return (
        <>
            <Helmet>
                <title>DNews</title>
            </Helmet>

            <Router>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route component={NotFount} />
                </Switch>
            </Router>
        </>
    );
});

export default App;
