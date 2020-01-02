import React from 'react';
import NotificationCard from '../notificationCard';
import { samplePostNotification, sampleFollowNotification } from '../../../utils/hardcodedData';

const NotificationScreen = React.memo(() => {
    const notifications = [
        samplePostNotification,
        { ...samplePostNotification, pk: 2, like: true },
        sampleFollowNotification,
        { ...sampleFollowNotification, pk: 11, accept: true },
    ];

    return (
        <>
            {notifications.map((notification, index, array) => (
                <NotificationCard
                    showBorder={index < array.length - 1}
                    notification={notification}
                    {...(index ? {} : { style: { paddingTop: 30 } })}
                    key={notification.pk}
                />
            ))}
        </>
    );
});
export default NotificationScreen;
