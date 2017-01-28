import api from 'api';

export const signedIn = (token) => ({ type: 'SIGNED_IN', data: token })
export const errorSigningIn = (errors) => ({ type: 'ERROR_SIGINIG_IN', data: errors })
export const saveCurrentPath = (path) => ({ type: 'SAVE_CURRENT_PATH', data: path })

export const signin = (email, password) => {
  let responseCode;
  return dispatch => {
    api.authorize(email, password)
    .then(response => {
      responseCode = response.status;
      return response.json()
    })
    .then(payload => {
      switch (responseCode) {
        case 401:
          dispatch(errorSigningIn(payload.errors));
          break
        case 200:
          dispatch(signedIn(payload.token));
          break
        default:
          dispatch(errorSigningIn("Unknown error"))
      }
    })
    .catch(result => {
      console.log("Fail ", result)
    })
  }
}
