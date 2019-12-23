import { combineReducers } from 'redux';
import { createReducer } from 'redux-orm';

import orm from '../orm';
import { registerUserReducer } from './AuthReducers';

const ormReducer = createReducer(orm);

const appReducer = combineReducers({
    ormDatabase: ormReducer,
    loginUser: registerUserReducer,
});

export default appReducer;
