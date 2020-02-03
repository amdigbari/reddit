import { sampleUser, samplePostNotification, sampleFollowNotification } from '../utils/hardcodedData';
import { customFetch } from 'utils/functionalUtils';
import { UPDATE_PROFILE_API } from 'api/profileApi';
import { registerUserSuccess } from './AuthActions';

export const getUserProfileById = pk => dispatch => {
    return sampleUser;
};

export const getNotifications = () => dispatch => {
    return [
        samplePostNotification,
        { ...samplePostNotification, pk: 2, like: true },
        sampleFollowNotification,
        { ...sampleFollowNotification, pk: 11, accept: true },
    ];
};

export const getFollowList = (pk, type) => dispatch => {
    return [sampleUser, { ...sampleUser, pk: 2 }, { ...sampleUser, pk: 3 }, { ...sampleUser, pk: 4 }];
};

export const updateProfile = request => dispatch => {
    return customFetch(UPDATE_PROFILE_API, {
        method: 'PUT',
        body: JSON.stringify(request),
    })
        .then(res => res.json())
        .then(response => {
            dispatch(registerUserSuccess(response));
            return response;
        });
};
