import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appReducer from '../reducers';
import { PERSIST_STORE_KEY } from '../utils/staticUtils';

const persistConfig = {
    key: PERSIST_STORE_KEY,
    storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

let ReactotronConfig = require('../configs/ReactotronConfig').default;

export let store =
    process.env.NODE_ENV === 'production'
        ? createStore(persistedReducer, {}, applyMiddleware(thunk))
        : createStore(persistedReducer, compose(applyMiddleware(thunk), ReactotronConfig.createEnhancer()));

export let persistor = persistStore(store);
