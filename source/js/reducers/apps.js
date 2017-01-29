import { Map } from 'immutable';

const initialState = Map([]);

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'APPS_LOADED': {
      const apps = {};
      action.data.forEach((app) => { apps[app.id] = app; });
      return Map(apps);
    }
    default:
      return state;
  }
}
