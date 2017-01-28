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
