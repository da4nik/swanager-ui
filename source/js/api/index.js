const apiURL = 'http://localhost:4945/api/v1';

function authorize(email, password) {
  return fetch(`${ apiURL }/session`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
  });
}

export default {
  authorize,
};
