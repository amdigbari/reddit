import { REGISTER_USER, UNREGISTER_USER } from '../actions/ActionTypes';

export const registerUserReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return action.user;
        case UNREGISTER_USER:
            return {};
        default:
            return state;
    }
};
