import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { userReducer } from '../reducers/index';
import transmute from './transmute';
import { reducer } from './transmute/reducer';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({ transmute: reducer, user: userReducer }))

export default function configureStore(initialState) {
  const store = createStore(persistedReducer, compose(applyMiddleware(logger, thunk)));
  transmute.init(store);
  const persistor = persistStore(store);

  return { persistor, store };
}

// export const store = createStore(
//   combineReducers({ transmute: reducer, user: userReducer }), compose(applyMiddleware(logger, thunk))
// );

// console.log("transmute init")
// transmute.init(store);