import React from 'react';

import CustomScreen from '../common/customScreen/CustomScreen';
import CustomNavbar from '../common/customNavbar/CustomNavbar';
import { navigationTabs, samplePost } from '../../utils/hardcodedData';
import PostCard from '../post/postCard/PostCard';

const Homepage = React.memo(props => {
    const renderComponent = React.useCallback(activeNavigatorId => {
        const activeNavigator = navigationTabs.find(navigator => navigator.id === activeNavigatorId).title;

        return (
            <>
                <PostCard post={samplePost} showBorder />
                <PostCard post={samplePost} />
            </>
        );
    }, []);

    return (
        <CustomScreen>
            <CustomNavbar navigators={navigationTabs} renderComponent={renderComponent} />
        </CustomScreen>
    );
});

export default Homepage;
