import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Loading } from './common/CommonComponents';
import CustomScreen from './common/customScreen/CustomScreen';

const Homepage = lazy(() => import('./homepage'));
const NotFound = lazy(() => import('./notFound'));
const PostScreen = lazy(() => import('./post/postScreen'));
const PostsScreen = lazy(() => import('./post/postsScreen'));
const ChannelScreen = lazy(() => import('./channel/channelScreen'));
const ChannelsScreen = lazy(() => import('./channel/channelsScreen'));

const SuspenseFallback = () => {
    const containerStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={containerStyle}>
            <Loading />
        </div>
    );
};

const RootRouter = React.memo(() => {
    return (
        <BrowserRouter>
            <CustomScreen>
                <Suspense fallback={<SuspenseFallback />}>
                    <Switch>
                        <Route exact path="/" component={Homepage} />

                        <Route exact path="/posts/" component={PostsScreen} />
                        <Route exact path="/posts/:pk" component={PostScreen} />

                        <Route exact path="/channels/" component={ChannelsScreen} />
                        <Route exact path="/channels/:pk" component={ChannelScreen} />

                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </CustomScreen>
        </BrowserRouter>
    );
});
export default RootRouter;
