import { store } from '../index';
import { addAutohidedNotification } from '../actions/notifications';
import API from '../api';

const startWebsocket = () => {
  const socket = new WebSocket(API.wsURL);

  socket.onmessage = (messageEvent) => {
    store.dispatch(addAutohidedNotification('WS', messageEvent.data));
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

    setTimeout(() => { startWebsocket(); }, 1000);
  };

  // socket.onerror = (event) => { };
};

export default {
  startWebsocket,
};
