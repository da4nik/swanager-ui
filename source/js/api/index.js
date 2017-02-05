import { store } from '../index';

const baseHost = 'localhost:4945';
const apiURL = `http://${ baseHost }/api/v1`;
const wsURL = `ws://${ baseHost }/ws`;

const getToken = () => {
  const state = store.getState();
  return state.auth.get('authToken');
};

const authHeaders = () => {
  const token = getToken();
  return (token && token.length > 0) ? { 'Authorization': getToken() } : {};
};

const jsonHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
};

const headers = (additionalHeaders = {}) => {
  return new Headers(
    Object.assign({},
      additionalHeaders,
      jsonHeaders(),
      authHeaders()
    )
  );
};

// ################# AUTH

const authorize = (email, password) => {
  return fetch(`${ apiURL }/session`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: headers(),
  });
};

// ################# APPLICATION

const appActions = {
  START: 'start',
  STOP: 'stop',
};


const applications = () => {
  return fetch(`${ apiURL }/apps`, {
    method: 'GET',
    headers: headers(),
  });
};

const saveApplication = (app) => {
  // Create if id not exists or empty
  let method = 'POST';
  let url = `${ apiURL }/apps`;

  if (app.id && app.id.length > 0) {
    method = 'PUT';
    url = `${ apiURL }/apps/${ app.id }`;
  }

  return fetch(url, {
    method,
    headers: headers(),
    body: JSON.stringify(app),
  });
};

const destroyApplication = (app) => {
  return fetch(`${ apiURL }/apps/${ app.id }`, {
    method: 'DELETE',
    headers: headers(),
  });
};

const applicationAction = (app, action) => {
  const url = `${ apiURL }/apps/${ app.id }/${ action }`;
  return fetch(url, {
    method: 'PUT',
    headers: headers(),
  });
};

// ################# SERVICE

const services = () => {
  return fetch(`${ apiURL }/services`, {
    method: 'GET',
    headers: headers(),
  });
};

const saveService = (service) => {
  // Create if id not exists or empty
  let method = 'POST';
  let url = `${ apiURL }/services`;

  if (service.id && service.id.length > 0) {
    method = 'PUT';
    url = `${ apiURL }/services/${ service.id }`;
  }

  return fetch(url, {
    method,
    headers: headers(),
    body: JSON.stringify(service),
  });
};

export default {
  apiURL,
  wsURL,
  authorize,
  services,
  saveService,
  applicationAction,
  destroyApplication,
  saveApplication,
  applications,
  appActions,
};
