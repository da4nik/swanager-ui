import config from 'config';
import { store } from '../index';

const apiURL = config.apiURL;
const wsURL = config.wsURL;

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

const signout = () => {
  return fetch(`${ apiURL }/session`, {
    method: 'DELETE',
    headers: headers(),
  });
};

const signup = (email, password, PasswordConfirmation) => {
  return fetch(`${ apiURL }/users`, {
    method: 'POST',
    body: JSON.stringify({ email, password, password_confirmation: PasswordConfirmation }),
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

const serviceActions = {
  START: 'start',
  STOP: 'stop',
};

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

const removeService = (service) => {
  return fetch(`${ apiURL }/services/${ service.id }`, {
    method: 'DELETE',
    headers: headers(),
  });
};

const serviceAction = (service, action) => {
  const url = `${ apiURL }/services/${ service.id }/${ action }`;
  return fetch(url, {
    method: 'PUT',
    headers: headers(),
  });
};

// ################# Exports

export default {
  apiURL,
  wsURL,
  authorize,
  signout,
  signup,
  services,
  saveService,
  removeService,
  serviceAction,
  serviceActions,
  applicationAction,
  destroyApplication,
  saveApplication,
  applications,
  appActions,
};
