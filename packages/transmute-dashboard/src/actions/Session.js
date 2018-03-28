import { Constants } from '../constants'

export const onAccessTokenRecovered = (token) => ({
  type: Constants.ACCESS_TOKEN_RECOVERED,
  payload: token
});

export const logoutApiCall = (oktaAuth, email, password) => {
  return dispatch => {
    return oktaAuth.signOut().then(() => {
      dispatch(logoutSuccess())
    }).catch(err => {
      dispatch(logoutError(err.message));
    });
  };
};

export const logoutError = (error) => ({
  type: Constants.LOGOUT_ERROR,
  payload: error
});

export const logoutSuccess = (error) => ({
  type: Constants.LOGOUT_SUCCESS
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