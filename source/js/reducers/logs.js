import { SERVICE_LOGS } from '../actions';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SERVICE_LOGS: {
      const newState = state;
      newState[action.data.service.id] = action.data.logs;
      return newState;
    }
    default:
      return state;
  }
}
