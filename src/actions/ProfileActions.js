import { customFetch } from 'utils/functionalUtils';
import { UPDATE_PROFILE_API, GET_NOTIFICATIONS_API, getFollowListApi, getProfileApi, getFollowProfileApi } from 'api/profileApi';
import { registerUserSuccess } from './AuthActions';
import { SET_NOTIFICATIONS_COUNT } from './ActionTypes';

export const getUserProfileById = pk => dispatch => {
    return customFetch(getProfileApi(pk)).then(response => {
        if (response.length) return { ...response[0], id: response[0].user };
        throw 404;
    });
};

export const getNotifications = (see = false) => dispatch => {
    return customFetch(GET_NOTIFICATIONS_API).then(response => {
        dispatch({ type: SET_NOTIFICATIONS_COUNT, payload: see ? 0 : response.length });
        see && customFetch(GET_NOTIFICATIONS_API, { method: 'PUT' });
        return response;
    });
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

export const updateProfile = formData => dispatch => {
    return customFetch(
        UPDATE_PROFILE_API,
        {
            method: 'PUT',
            body: formData,
        },
        false,
    ).then(response => {
        dispatch(registerUserSuccess(response));
        return response;
    });
};

export const followUser = (id, action) => dispatch => {
    return customFetch(getFollowProfileApi(id, action), { method: 'PUT' });
};
