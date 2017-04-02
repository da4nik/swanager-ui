import { Map } from 'immutable';
import { RESET_SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from '../actions';

const initialState = Map({});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_SIGN_UP:
      return state.set('errors', null).set('data', null);

    case SIGN_UP_SUCCESS:
      return state.set('data', action.data);

    case SIGN_UP_ERROR:
      return state.set('errors', action.data);

    default:
      return state;
  }
}

