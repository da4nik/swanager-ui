import { Map } from 'immutable';
import { ADD_NOTIFICATION, HIDE_NOTIFICATION, ADD_NOTIFICATION_OBJECT } from '../actions';
import { guidGenerator } from '../lib';

const initialState = Map([]);

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      const notification = Object.assign({}, { id: guidGenerator() }, action.data);
      return state.set(notification.id, notification);
    }
    case ADD_NOTIFICATION_OBJECT:
      return state.set(action.data.id, action.data);
    case HIDE_NOTIFICATION:
      return state.delete(action.data.id);
    default:
      return state;
  }
}
