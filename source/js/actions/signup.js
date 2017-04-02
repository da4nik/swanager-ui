import API from '../api';
import { RESET_SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from './index';

export const resetSignup = (data) => ({ type: RESET_SIGN_UP });
export const signupSuccess = (data) => ({ type: SIGN_UP_SUCCESS, data: data });
export const signupError = (data) => ({ type: SIGN_UP_ERROR, data: data });

export const signup = (email, password, password_confirmation) => {
  let responseCode;
  return dispatch => {
    API.signup(email, password, password_confirmation)
    .then(response => {
      responseCode = response.status;
      return response.json();
    })
    .then(payload => {
      switch (responseCode) {
        case 400:
          dispatch(signupError(payload.errors));
          break;
        case 201:
          dispatch(signupSuccess(payload));
          break;
        default:
          dispatch(signupError('Unknown error'));
      }
    })
    .catch(() => {
    });
  };
};

