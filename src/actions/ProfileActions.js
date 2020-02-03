import { sampleUser, samplePostNotification, sampleFollowNotification } from '../utils/hardcodedData';
import { customFetch } from 'utils/functionalUtils';
import { UPDATE_PROFILE_API, GET_NOTIFICATIONS_API, getFollowListApi } from 'api/profileApi';
import { registerUserSuccess } from './AuthActions';

export const getUserProfileById = pk => dispatch => {
    return sampleUser;
};

export const getNotifications = () => dispatch => {
    // return customFetch(GET_NOTIFICATIONS_API);

    return [
        samplePostNotification,
        { ...samplePostNotification, pk: 2, like: true },
        sampleFollowNotification,
        { ...sampleFollowNotification, pk: 11, accept: true },
    ];
};

export const getFollowList = (pk, type) => dispatch => {
    return customFetch(getFollowListApi(type === 'followers', pk)).then(response => {
        return type === 'followers'
            ? [...response.map(user => ({ ...user, isChannel: false }))]
            : [
                  ...response.people.map(user => ({ ...user, isChannel: false })),
                  ...response.people.map(channel => ({ ...channel, isChannel: true })),
              ];
    });
};

export const updateProfile = request => dispatch => {
    return customFetch(UPDATE_PROFILE_API, {
        method: 'PUT',
        body: JSON.stringify(request),
    }).then(response => {
        dispatch(registerUserSuccess(response));
        return response;
    });
};
