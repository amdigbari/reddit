import React from 'react';
import { connect } from 'react-redux';

import CustomNavbar from '../common/customNavbar/CustomNavbar';
import { navigationTabs } from '../../utils/hardcodedData';
import PostCard from '../post/postCard/PostCard';
import { getDashboardPosts } from 'actions/PostActions';
import { useToggle } from 'components/common/customHooks';
import ScreenWithError from 'components/common/screenWithError';

const Homepage = React.memo(({ getPosts, setSnackMessage }) => {
    let [posts, setPosts] = React.useState([]);
    let [activeId, setActiveId] = React.useState(navigationTabs[0].id);
    let [loading, toggleLoading] = useToggle(false);

    let activeTitle = React.useMemo(() => navigationTabs.find(navigator => navigator.id === activeId).title, [activeId]);

    // const renderComponent = React.useCallback(activeNavigatorId => {
    //     const activeNavigator = navigationTabs.find(navigator => navigator.id === activeNavigatorId).title;

    //     return posts.map((post, index, array) => <PostCard post={post} key={post.id} showBorder={index < array.length - 1} />);
    // }, []);

    React.useEffect(() => {
        toggleLoading();
        getPosts(activeTitle)
            .then(setPosts)
            .catch(() => setSnackMessage({ type: 'error', text: "can't connect to server" }))
            .finally(() => toggleLoading());
    }, [activeTitle]);

    const renderComponent = React.useCallback(
        () => posts.map((post, index, array) => <PostCard post={post} key={post.id} showBorder={index < array.length - 1} />),
        [posts],
    );

    return (
        <CustomNavbar
            navigators={navigationTabs}
            renderComponent={renderComponent}
            setActiveId={setActiveId}
            activeId={activeId}
            loading={loading}
        />
    );
});

const mapDispatchToProps = {
    getPosts: getDashboardPosts,
};

export default connect(undefined, mapDispatchToProps)(ScreenWithError(Homepage));
