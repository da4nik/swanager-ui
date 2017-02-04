import { store } from '../index';
import { addNotification, hideNotification } from '../actions/notifications';

const add = (notification) => {
  store.dispatch(addNotification(notification));
};

const hide = (notification) => {
  store.dispatch(hideNotification(notification));
};

export default { add, hide };
