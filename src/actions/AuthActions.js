import { REGISTER_USER, UNREGISTER_USER } from './ActionTypes';

export const registerUser = user => dispatch => {
    dispatch({
        type: REGISTER_USER,
        user,
    });
};
export const unRegisterUser = () => dispatch => {
    dispatch({
        type: UNREGISTER_USER,
    });
};
