import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from '../reducers/index';
import transmute from './transmute';
import { reducer } from './transmute/reducer';

export const store = createStore(
  combineReducers({ transmute: reducer, user: userReducer }), compose(applyMiddleware(logger, thunk))
);

transmute.init(store);