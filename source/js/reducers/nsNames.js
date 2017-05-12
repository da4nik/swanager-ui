import { Map } from 'immutable';
import { UPDATE_NSNAMES  } from '../actions';

const initialState = Map({});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_NSNAMES : {
      const services = {};
      console.log('UPDATE_NSNAMES ');
      console.log(action);
      //action.data.forEach((service) => { services[service.id] = service; });
      return Map(services);
    }
    default:
      return state;
  }
}
