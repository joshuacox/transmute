import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import reducers from '../reducers/index';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();
const middleware = routerMiddleware(history);

export const store = createStore(
  reducers, compose(applyMiddleware(logger, middleware, thunk))
);
