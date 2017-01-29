import { applications, saveApplication } from '../api';
import { APPS_LOADED, APP_LOADED } from './index';

export const appsLoaded = (apps) => ({ type: APPS_LOADED, data: apps });
export const appLoaded = (app) => ({ type: APP_LOADED, data: app });

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

export const saveApp = (app) => {
  let responseStatus;
  return dispatch => {
    saveApplication(app)
    .then(response => {
      responseStatus = response.status;
      return response.json();
    })
    .then(payload => {
      switch (responseStatus) {
        case 200:
        case 201:
          dispatch(appLoaded(payload.application));
          break;
        default:

      }
    })
    .catch(response => {
      console.log(response);
    });
  };
};
