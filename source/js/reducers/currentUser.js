import { Map } from 'immutable';
import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions';

const initialState = Map(JSON.parse(localStorage.getItem('currentUser') || '{}'));

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT_USER:
      localStorage.setItem('currentUser', JSON.stringify(action.data));
      return Map(action.data);
    case REMOVE_CURRENT_USER:
      localStorage.removeItem('currentUser');
      return Map({});
    default:
      return state;
  }
}
