import { store } from '../index';
import { addNotification, addAutohidedNotification } from '../actions/notifications';

const add = (title, text) => {
  store.dispatch(addNotification(title, text));
};

const addAutoHide = (title, text, duration) => {
  store.dispatch(addAutohidedNotification(title, text, duration));
};

export default { add, addAutoHide };
