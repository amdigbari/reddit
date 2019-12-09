import { combineReducers } from 'redux';
import { createReducer } from 'redux-orm';

import orm from '../orm';

const ormReducer = createReducer(orm);

const appReducer = combineReducers({
    ormDatabase: ormReducer,
});

export default appReducer;
