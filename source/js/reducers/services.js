import { Map } from 'immutable';
import { SERVICES_LOADED, SERVICE_LOADED } from '../actions';

const initialState = Map({});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SERVICES_LOADED: {
      const services = {};
      action.data.forEach((service) => { services[service.id] = service; });
      return Map(services);
    }
    case SERVICE_LOADED:
      return state.set(action.data.id, action.data);
    default:
      return state;
  }
}
