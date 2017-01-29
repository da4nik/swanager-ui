import { Map } from 'immutable';
import { SERVICES_LOADED } from '../actions';

const initialState = Map({});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SERVICES_LOADED: {
      const services = {};
      action.data.forEach((service) => { services[service.id] = service; });
      return Map(services);
    }
    default:
      return state;
  }
}
