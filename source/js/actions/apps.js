import API from '../api';
import { APPS_LOADED, APP_LOADED, APP_DELETED } from './index';
import { signout } from './signin';
import { loadServices } from './services';
import { addAutohidedNotification } from './notifications';

export const appsLoaded = (apps) => ({ type: APPS_LOADED, data: apps });
export const appLoaded = (app) => ({ type: APP_LOADED, data: app });
export const appDeleted = (app) => ({ type: APP_DELETED, data: app });

export const loadApplications = () => {
  let responseStatus;
  return dispatch => {
    API.applications()
    .then(response => {
      responseStatus = response.status;
      return response.json();
    })
    .then(responseBody => {
      switch (responseStatus) {
        case 200:
          dispatch(appsLoaded(responseBody.applications));
          dispatch(addAutohidedNotification('API', 'Applications loaded'));
          dispatch(loadServices());
          break;
        case 401:
          dispatch(signout());
          break;
        default:
      }
    })
    .catch(response => {
      console.log('[loadApps] Something went wrong.', response);
    });
  };
};

export const saveApplication = (app) => {
  let responseStatus;
  return dispatch => {
    API.saveApplication(app)
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
        case 401:
          dispatch(signout());
          break;
        default:
      }
    })
    .catch(response => {
      console.log('[saveApp] Something went wrong.', response);
    });
  };
};

export const destroyApplication = (app) => {
  let responseStatus;
  return dispatch => {
    API.destroyApplication(app)
    .then(response => {
      responseStatus = response.status;
      return response.json();
    })
    .then(payload => {
      switch (responseStatus) {
        case 200:
          dispatch(appDeleted(payload.application));
          break;
        case 401:
          dispatch(signout());
          break;
        default:
      }
    })
    .catch(response => {
      console.log('[destroyApp] Something went wrong.', response);
    });
  };
};

export const applyAppAction = (app, action) => {
  let responseStatus;
  return dispatch => {
    API.applicationAction(app, action)
    .then(response => {
      responseStatus = response.status;
      return response.json();
    })
    .then(payload => {

    })
    .catch(response => {
      console.log('[applyAppAction] Something went wrong.', response);
    });
  };
};
