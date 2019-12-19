import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Homepage from './homepage';
import NotFount from './notFount';
import PostScreen from './post/postScreen';

const RootRouter = React.memo(() => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/posts/:pk" component={PostScreen} />
                <Route component={NotFount} />
            </Switch>
        </BrowserRouter>
    );
});
export default RootRouter;
