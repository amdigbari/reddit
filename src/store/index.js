import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import appReducer from '../reducers';

export let store = createStore(appReducer, {}, applyMiddleware(thunk));
