import { applications } from '../api';

export const appsLoaded = (apps) => ({ type: 'APPS_LOADED', data: apps });

export const loadApps = () => {
  let responseStatus;
  return dispatch => {
    applications()
    .then(response => {
      responseStatus = response.status;
      return response.json();
    })
    .then(responseBody => {
      switch (responseStatus) {
        case 200:
          dispatch(appsLoaded(responseBody.applications));
          break;
        default:
      }
    })
    .catch(() => {
    });
  };
};
