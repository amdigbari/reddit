import { combineReducers } from 'redux';

import { registerUserReducer } from './AuthReducers';
import { setNotificationCount } from './profileReducers';

const appReducer = combineReducers({
    loginUser: registerUserReducer,
    notificationsCount: setNotificationCount,
});

export default appReducer;
