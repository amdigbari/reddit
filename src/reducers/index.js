import { combineReducers } from 'redux';

import { registerUserReducer } from './AuthReducers';

const appReducer = combineReducers({
    loginUser: registerUserReducer,
});

export default appReducer;
