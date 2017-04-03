import API from '../api';
import { SIGNED_IN, ERROR_SIGINIG_IN, SAVE_CURRENT_PATH, UNAUTHORIZED, SIGN_IN_RESET, SIGN_IN_ERROR } from './index';

export const signinLoaded = () => ({ type: SIGN_IN_RESET });
export const signinSetError = (error) => ({ type: SIGN_IN_ERROR, data: error });
export const signedIn = (token) => ({ type: SIGNED_IN, data: token });
export const errorSigningIn = (errors) => ({ type: ERROR_SIGINIG_IN, data: errors });
export const saveCurrentPath = (path) => ({ type: SAVE_CURRENT_PATH, data: path });

export const saveTokenToLocalstore = (token) => {
  return () => {
    localStorage.setItem('authToken', token.token);
  };
};

export const signin = (email, password) => {
  let responseCode;
  return dispatch => {
    API.authorize(email, password)
    .then(response => {
      responseCode = response.status;
      return response.json();
    })
    .then(payload => {
      switch (responseCode) {
        case 401:
          dispatch(errorSigningIn(payload.errors));
          break;
        case 200:
          dispatch(signedIn(payload.token));
          dispatch(saveTokenToLocalstore(payload.token));
          break;
        default:
          dispatch(errorSigningIn('Unknown error'));
      }
    })
    .catch(() => {
      dispatch(errorSigningIn('Unknown error'));
    });
  };
};

export const signout = () => {
  localStorage.removeItem('authToken');
  return { type: UNAUTHORIZED, data: null };
};

