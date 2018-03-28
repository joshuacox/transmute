import { Constants } from '../constants'

const initialState = {
  sessionToken: null,
  error: null,
  success: ''
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Constants.REGISTRATION_SUCCESS:
      return Object.assign({}, state, { error: null });
    case Constants.REGISTRATION_ERROR:
      return Object.assign({}, state, { error: action.payload });
    case Constants.LOGIN_ERROR:
      return Object.assign({}, state, { sessionToken: null, error: action.payload });
    case Constants.LOGIN_SUCCESS:
      return Object.assign({}, state, { sessionToken: action.payload, error: null });
    case Constants.ACCESS_TOKEN_RECOVERED:
      return Object.assign({}, state, { sessionToken: action.payload });
    case Constants.LOGOUT_SUCCESS:
      return Object.assign({}, state, { sessionToken: null, error: null });
    case Constants.LOGOUT_ERROR:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
};

export default user;