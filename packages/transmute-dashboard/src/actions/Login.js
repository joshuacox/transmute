export const logout = () => ({
  type: 'LOGOUT'
});

export const loginError = (error) => ({
  type: 'LOGIN_ERROR',
  payload: error
});

export const loginSuccess = (data) => ({
  type: 'LOGIN_SUCCESS',
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