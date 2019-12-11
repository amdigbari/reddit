import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import CustomScreen from './common/customScreen/CustomScreen';

const App = React.memo(props => {
    const renderHomepage = React.useCallback(() => {
        return <CustomScreen></CustomScreen>;
    }, []);

    return (
        <>
            <Helmet>
                <title>DNews</title>
            </Helmet>

            <Router>
                <Switch>
                    <Route exact path="/" render={renderHomepage} />
                </Switch>
            </Router>
        </>
    );
});

export default App;
