import { store } from '../index';

const apiURL = 'http://localhost:4945/api/v1';

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

export const authorize = (email, password) => {
  return fetch(`${ apiURL }/session`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: headers(),
  });
};

export const applications = () => {
  return fetch(`${ apiURL }/apps`, {
    method: 'GET',
    headers: headers(),
  });
};

export const saveApplication = (app) => {
  // Create if id not exists or empty
  let method = 'POST';
  let url = `${ apiURL }/apps`;

  if (app.id && app.length > 0) {
    method = 'PUT';
    url = `${ apiURL }/apps/${ app.id }`;
  }

  return fetch(url, {
    method,
    headers: headers(),
    body: JSON.stringify(app),
  });
};

export const services = () => {
  return fetch(`${ apiURL }/services`, {
    method: 'GET',
    headers: headers(),
  });
};
