import { List } from 'immutable';

const initialState = List([]);

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'APPS_LOADED':
      return List(action.data);
    default:
      return state;
  }
}
