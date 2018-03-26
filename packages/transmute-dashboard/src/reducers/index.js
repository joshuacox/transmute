import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from "./User";

const OktaAppReducer = combineReducers({
  user: user,
  router: routerReducer
});

export default OktaAppReducer;