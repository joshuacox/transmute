import { Constants } from '../constants'

export const logout = () => ({
  type: Constants.LOGOUT
});

export const loginError = (error) => ({
  type: Constants.LOGIN_ERROR,
  payload: error
});

export const loginSuccess = (data) => ({
  type: Constants.LOGIN_SUCCESS,
  payload: data
});

export const loginApiCall = (oktaAuth, email, password) => {
  return dispatch => {
    return oktaAuth.signIn({
      username: email,
      password: password
    }).then(res => {
      console.log(JSON.stringify(res));
      dispatch(loginSuccess(res.sessionToken))
    }).catch(err => {
      console.log(err.message + '\n error', err);
      dispatch(loginError(err.message));
    });
  };
};