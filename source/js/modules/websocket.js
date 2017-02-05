import { store } from '../index';
import { addAutohidedNotification } from '../actions/notifications';
import API from '../api';

const startWebsocket = () => {
  const socket = new WebSocket(API.wsURL);

  window.sendWSMessage = (msg) => {
    socket.send(JSON.stringify(msg));
  };

  socket.onmessage = (messageEvent) => {
    store.dispatch(addAutohidedNotification('WS', messageEvent.data));
  };

  socket.onopen = () => {
    store.dispatch(addAutohidedNotification('WS', '* Connected'));
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
