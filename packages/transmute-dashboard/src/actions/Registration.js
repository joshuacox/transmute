import { Constants } from '../constants'
import axios from 'axios';
import { loginApiCall } from './Login';
import config from '../app.config';

export const registrationError = (error) => ({
  type: Constants.REGISTRATION_ERROR,
  payload: error
});

export const registrationSuccess = () => ({
  type: Constants.REGISTRATION_SUCCESS
});

export const registrationApiCall = (oktaAuth, data) => {
  console.log(data);
  return dispatch => {
    return axios({
      method: 'post',
      url: config.url + '/api/users',
      data: data,
      config: {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    })
      .then(json => {
        console.log("json, here's the json: ", json);
        dispatch(registrationSuccess());
        dispatch(loginApiCall(oktaAuth, data.email, data.password));
      })
      .catch(err => {
        console.log("registration err: ", err);
        dispatch(registrationError(err.message))
      });
  };
};