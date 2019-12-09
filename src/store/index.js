import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import appReducer from '../reducers';

let ReactotronConfig = require('../configs/ReactotronConfig').default;

export let store =
    process.env.NODE_ENV === 'production'
        ? createStore(appReducer, {}, applyMiddleware(thunk))
        : createStore(appReducer, compose(applyMiddleware(thunk), ReactotronConfig.createEnhancer()));
