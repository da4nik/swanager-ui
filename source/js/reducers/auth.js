import { Map } from 'immutable';
import { SIGNED_IN, ERROR_SIGINIG_IN, SAVE_CURRENT_PATH, UNAUTHORIZED, SIGN_IN_RESET, SIGN_IN_ERROR } from '../actions';

const initialState = Map({
  authToken: localStorage.getItem('authToken') || '',
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGN_IN_ERROR:
      return state.set('errors', action.data);
    case SIGN_IN_RESET:
      return state.set('errors', null);
    case SIGNED_IN:
      return state.set('authToken', action.data.token);
    case ERROR_SIGINIG_IN:
      return state.set('authToken', '')
                  .set('errors', action.data);
    case SAVE_CURRENT_PATH:
      return state.set('redirectPath', action.data);
    case UNAUTHORIZED:
      return state.set('authToken', '');
    default:
      return state;
  }
}
