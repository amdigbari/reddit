import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Loading } from './common/CommonComponents';
import CustomScreen from './common/customScreen/CustomScreen';
import { basePath, userPath, postPath, channelPath, notificationPath, commentPath } from '../utils/pathUtils';

const Homepage = lazy(() => import('./homepage'));

const NotFound = lazy(() => import('./notFound'));

const PostScreen = lazy(() => import('./post/postScreen'));
const PostsScreen = lazy(() => import('./post/postsScreen'));

const CommentScreen = lazy(() => import('./post/postScreen'));

const ChannelScreen = lazy(() => import('./channel/channelScreen'));
const ChannelsScreen = lazy(() => import('./channel/channelsScreen'));

const ProfileScreen = lazy(() => import('./profile/profileScreen'));
const FollowList = lazy(() => import('./profile/followList'));

const NotificationScreen = lazy(() => import('./notification/notificationScreen'));

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
    const renderUserRoute = React.useCallback(({ match }) => {
        return (
            <Switch>
                <Route exact path={match.path} component={ProfileScreen} />
                <Route exact path={`${match.path}posts/`} component={PostsScreen} />
                <Route exact path={`${match.path}channels/`} component={ChannelsScreen} />
                <Route exact path={[`${match.path}followers/`, `${match.path}followings/`]} component={FollowList} />
                <Route component={NotFound} />
            </Switch>
        );
    }, []);

    return (
        <BrowserRouter>
            <CustomScreen>
                <Suspense fallback={<SuspenseFallback />}>
                    <Switch>
                        <Route exact path={basePath} component={Homepage} />

                        <Route path={userPath()} render={renderUserRoute} />

                        <Route path={commentPath()} render={CommentScreen} />

                        <Route exact path={postPath()} component={PostScreen} />

                        <Route exact path={channelPath()} component={ChannelScreen} />

                        <Route exact path={notificationPath} component={NotificationScreen} />

                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </CustomScreen>
        </BrowserRouter>
    );
});
export default RootRouter;
