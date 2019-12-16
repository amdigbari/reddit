import React from 'react';

import CustomScreen from '../common/customScreen/CustomScreen';
import CustomNavbar from '../common/navbar/CustomNavbar';
import { navigationTabs } from '../../utils/hardcodedData';

const Homepage = React.memo(props => {
    const renderComponent = React.useCallback(activeNavigatorId => {
        return <div>{navigationTabs.find(navigator => navigator.id === activeNavigatorId).title}</div>;
    }, []);

    return (
        <CustomScreen>
            <CustomNavbar navigators={navigationTabs} renderComponent={renderComponent} />
        </CustomScreen>
    );
});

export default Homepage;
