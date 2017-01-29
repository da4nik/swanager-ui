import { Map } from 'immutable';
import { APPS_LOADED, APP_LOADED } from '../actions';

const initialState = Map([]);

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case APPS_LOADED: {
      const apps = {};
      action.data.forEach((app) => { apps[app.id] = app; });
      return Map(apps);
    }
    case APP_LOADED:
      return state.set(action.data.id, action.data);
    default:
      return state;
  }
}
