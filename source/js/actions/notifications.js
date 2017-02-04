import { ADD_NOTIFICATION, HIDE_NOTIFICATION, ADD_NOTIFICATION_OBJECT } from './';
import { guidGenerator } from '../lib';

export const addNotification = (title, text) => ({
  type: ADD_NOTIFICATION,
  data: { title, text },
});

export const hideNotification = (notification) => ({
  type: HIDE_NOTIFICATION,
  data: notification,
});

export const addNotificationObject = (notification) => ({
  type: ADD_NOTIFICATION_OBJECT,
  data: notification,
});

export const addAutohidedNotification = (title, text, delay = 5000) => {
  const notification = {
    id: guidGenerator(),
    title,
    text,
  };

  return dispatch => {
    dispatch(addNotificationObject(notification));
    setTimeout(() => {
      dispatch(hideNotification(notification));
    }, delay);
  };
};
