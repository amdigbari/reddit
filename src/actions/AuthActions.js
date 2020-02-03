import { encode } from 'base-64';

import { REGISTER_USER, UNREGISTER_USER } from './ActionTypes';
import { customFetch } from 'utils/functionalUtils';
import { REGISTER_API, LOGIN_API } from 'api/authApi';

export const registerUserSuccess = user => ({
    type: REGISTER_USER,
    user,
});

export const registerUser = user => dispatch => {
    return customFetch(REGISTER_API, { method: 'POST', body: JSON.stringify(user) })
        .then(res => res.json())
        .then(response => {
            localStorage.setItem('token', encode(`${user.username}:${user.password}`));
            return response;
        })
        .catch(console.log);
};

const login = (request, dispatch) => {
    return customFetch(LOGIN_API, { method: 'POST', body: JSON.stringify(request) })
        .then(res => res.json())
        .then(response => {
            dispatch(registerUserSuccess(response));
            localStorage.setItem('token', encode(`${request.username}:${request.password}`));
            return response;
        });
};

export const loginUser = request => dispatch => {
    return login(request, dispatch).catch(console.log);
};

export const checkLogin = () => dispatch => {
    return customFetch(REGISTER_API, { method: 'GET' })
        .then(res => res.json())
        .then(response => response)
        .catch(error => {
            console.log(error);
            localStorage.removeItem('token');
        });
};

export const unRegisterUser = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({
        type: UNREGISTER_USER,
    });
};
