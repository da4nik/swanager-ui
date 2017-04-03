import API from '../api';
import { RESET_SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from './index';

export const resetSignup = (signupData) => ({ type: RESET_SIGN_UP, data: signupData });
export const signupSuccess = (signupData) => ({ type: SIGN_UP_SUCCESS, data: signupData });
export const signupError = (signupData) => ({ type: SIGN_UP_ERROR, data: signupData });

export const doSignup = (email, password, passwordConfirmation) => {
  let responseCode;
  return dispatch => {
    API.signup(email, password, passwordConfirmation)
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
      dispatch(signupError('Unknown error'));
    });
  };
};

