import React from 'react';
import { connect } from 'react-redux';

import NotificationCard from '../notificationCard';
import { getNotifications } from '../../../actions/ProfileActions';

const NotificationScreen = React.memo(({ getNotifications }) => {
    const [notifications, setNotifications] = React.useState([]);

    React.useEffect(() => {
        getNotifications()
            .then(response => setNotifications(response))
            .catch(console.log);
    }, [getNotifications]);

    return (
        <>
            {notifications.map((notification, index, array) => (
                <NotificationCard
                    showBorder={index < array.length - 1}
                    notification={notification}
                    {...(index ? {} : { style: { paddingTop: 30 } })}
                    key={notification.id}
                />
            ))}
        </>
    );
});

const mapDispatchToProps = {
    getNotifications,
};
export default connect(undefined, mapDispatchToProps)(NotificationScreen);
