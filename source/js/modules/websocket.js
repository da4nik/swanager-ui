import { store } from '../index';
import { addAutohidedNotification } from '../actions/notifications';
import { serviceLoaded } from '../actions/services';
import API from '../api';

const reconnectPeriod = 3000;

// const readyStateConnecting = 0;
const readyStateOpen = 1;
// const readyStateClosing = 2;
// const readyStateClosed = 3;

let socket;

const startWebsocket = () => {
  socket = new WebSocket(API.wsURL);

  socket.onmessage = (messageEvent) => {
    const message = JSON.parse(messageEvent.data);
    if (message.type === 'data') {
      if (message.data.service) {
        const service = message.data.service;
        store.dispatch(serviceLoaded(service));
        store.dispatch(
          addAutohidedNotification('WS', `Got service ${ service.ns_name } state update.`)
        );
      }
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

const send = (message) => {
  if (socket && socket.readyState && socket.readyState === readyStateOpen) {
    socket.send(JSON.stringify(message));
  }
};

window.send = send;

export default {
  startWebsocket,
  send,
};
