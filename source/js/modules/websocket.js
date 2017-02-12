import { store } from '../index';
import { addAutohidedNotification } from '../actions/notifications';
import { serviceLoaded } from '../actions/services';
import API from '../api';

const reconnectPeriod = 3000;

const startWebsocket = () => {
  const socket = new WebSocket(API.wsURL);

  socket.onmessage = (messageEvent) => {
    const message = JSON.parse(messageEvent.data);
    if (message.service) {
      store.dispatch(serviceLoaded(message.service));
    }

    if (message.data) {
      store.dispatch(addAutohidedNotification('WS', message.data));
    }
  };

  socket.onopen = () => {
    store.dispatch(addAutohidedNotification('WS', '* Connected'));

    // Authenticating with authToken
    const state = store.getState();
    const token = state.auth.get('authToken');
    socket.send(JSON.stringify({ token }));
  };

  socket.onclose = (event) => {
    if (event.wasClean) { return; }

    // Connection closed unexpectedly, reconnecting
    setTimeout(() => { startWebsocket(); }, reconnectPeriod);
  };

  // socket.onerror = (event) => { };
};

export default {
  startWebsocket,
};
