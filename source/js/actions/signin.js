import api from 'api';

export const signedIn = (token) => ({ type: 'SIGNED_IN', data: token })
export const errorSigningIn = (errors) => ({ type: 'ERROR_SIGINIG_IN', data: errors })
export const saveCurrentPath = (path) => ({ type: 'SAVE_CURRENT_PATH', data: path })

export const signin = (email, password) => {
  return dispatch => {
    api.authorize(email, password)
    .then(response => {
      console.log(response)
      const json = JSON.parse(response.body) //result.json()
      switch (response.status) {
        case 401:
          console.log(json)
          console.log(json.errors)
          dispatch(errorSigningIn(json.errors))
          break
        case 200:
          dispatch(signedIn(json.token))
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
