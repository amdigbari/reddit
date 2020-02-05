import { SET_NOTIFICATIONS_COUNT } from 'actions/ActionTypes';

export const setNotificationCount = (state = 0, action) => {
    switch (action.type) {
        case SET_NOTIFICATIONS_COUNT:
            return action.payload;
        default:
            return state;
    }
};
