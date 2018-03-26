const initialState = {
  sessionToken: null,
  error: null,
  success: ''
};


const login = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTRATION_SUCCESS':
      return Object.assign({}, state, { error: null });
    case 'REGISTRATION_ERROR':
      return Object.assign({}, state, { error: action.payload });
    case 'LOGOUT':
      return Object.assign({}, state, { sessionToken: null, error: null });
    case 'LOGIN_ERROR':
      return Object.assign({}, state, { sessionToken: null, error: action.payload });
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, { sessionToken: action.payload, error: null });
    case 'CHANGE_PASSWORD_SUCCESS':
      return Object.assign({}, state, { error: null, success: action.payload });
    case 'CHANGE_PASSWORD_ERROR':
      return Object.assign({}, state, { error: action.payload, success: null });
    default:
      return state;
  }
};

export default login;