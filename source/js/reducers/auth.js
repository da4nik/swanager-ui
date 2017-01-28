import { Map } from 'immutable';

const initialState = Map({
  authToken: ''
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SIGNED_IN':
      return state.set('authToken', action.data.token)
    case 'ERROR_SIGINIG_IN':
      return state.set('authToken', '').set('errors', action.data)
    case 'SAVE_CURRENT_PATH':
      return state.set('redirectPath', action.data)
    default:
      return state
  }
}
